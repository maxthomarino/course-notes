import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getR2Object, headR2Object } from "@/lib/r2";

export const dynamic = "force-dynamic";

type Params = { courseSlug: string; fileName: string };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { courseSlug, fileName } = await params;

  // Validate filename to prevent path traversal
  if (fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
    return new NextResponse("Invalid filename", { status: 400 });
  }

  const r2Key = `${courseSlug}/${fileName}`;
  const rangeHeader = request.headers.get("range") ?? undefined;

  // Attempt R2 first
  const r2Result = await getR2Object(r2Key, rangeHeader);
  if (r2Result) {
    const headers: Record<string, string> = {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    };
    if (r2Result.contentLength) {
      headers["Content-Length"] = String(r2Result.contentLength);
    }
    if (r2Result.contentRange) {
      headers["Content-Range"] = r2Result.contentRange;
    }

    return new NextResponse(r2Result.body as ReadableStream, {
      status: r2Result.statusCode,
      headers,
    });
  }

  // Fallback to local file
  const localPath = path.join(
    process.cwd(),
    "public",
    "pdfs",
    courseSlug,
    fileName
  );

  if (!fs.existsSync(localPath)) {
    return NextResponse.json(
      { error: "PDF not found", message: "This lecture PDF could not be found in either the primary storage or the local backup." },
      { status: 404 }
    );
  }

  const stat = fs.statSync(localPath);
  const fileSize = stat.size;

  // Handle Range requests for local files
  if (rangeHeader) {
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${fileSize}` },
        });
      }

      const chunkSize = end - start + 1;
      const stream = fs.createReadStream(localPath, { start, end });

      const webStream = new ReadableStream({
        start(controller) {
          stream.on("data", (chunk) => controller.enqueue(chunk));
          stream.on("end", () => controller.close());
          stream.on("error", (err) => controller.error(err));
        },
      });

      return new NextResponse(webStream, {
        status: 206,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${fileName}"`,
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Content-Length": String(chunkSize),
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800",
        },
      });
    }
  }

  // Full file response
  const stream = fs.createReadStream(localPath);
  const webStream = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => controller.enqueue(chunk));
      stream.on("end", () => controller.close());
      stream.on("error", (err) => controller.error(err));
    },
  });

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Content-Length": String(fileSize),
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=604800",
    },
  });
}

/**
 * HEAD request to get file metadata (used by PDF viewers to determine size).
 */
export async function HEAD(
  _request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { courseSlug, fileName } = await params;
  const r2Key = `${courseSlug}/${fileName}`;

  // Try R2 HEAD
  const r2Head = await headR2Object(r2Key);
  if (r2Head) {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(r2Head.contentLength),
        "Accept-Ranges": "bytes",
      },
    });
  }

  // Fallback to local file
  const localPath = path.join(
    process.cwd(),
    "public",
    "pdfs",
    courseSlug,
    fileName
  );

  if (!fs.existsSync(localPath)) {
    return new NextResponse(null, { status: 404 });
  }

  const stat = fs.statSync(localPath);
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(stat.size),
      "Accept-Ranges": "bytes",
    },
  });
}
