import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import type { Readable } from "stream";

const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_BUCKET = process.env.R2_BUCKET || "lecture-site";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

function isR2Configured(): boolean {
  return !!(R2_ENDPOINT && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

let _client: S3Client | null = null;

function getClient(): S3Client | null {
  if (!isR2Configured()) return null;
  if (!_client) {
    _client = new S3Client({
      region: "auto",
      endpoint: R2_ENDPOINT!,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID!,
        secretAccessKey: R2_SECRET_ACCESS_KEY!,
      },
    });
  }
  return _client;
}

export interface R2ListResult {
  key: string;
  size: number;
  lastModified?: Date;
}

/**
 * List all objects under a given prefix in R2.
 * Returns null if R2 is not configured or an error occurs.
 */
export async function listR2Objects(
  prefix: string
): Promise<R2ListResult[] | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET,
      Prefix: prefix.endsWith("/") ? prefix : `${prefix}/`,
    });
    const response = await client.send(command);
    if (!response.Contents) return [];

    return response.Contents.filter((obj) => obj.Key && obj.Key.endsWith(".pdf")).map(
      (obj) => ({
        key: obj.Key!,
        size: obj.Size ?? 0,
        lastModified: obj.LastModified,
      })
    );
  } catch (error) {
    console.error("R2 listObjects error:", error);
    return null;
  }
}

export interface R2ObjectResult {
  body: ReadableStream | Readable;
  contentLength: number;
  contentType: string;
  contentRange?: string;
  statusCode: number;
}

/**
 * Get an object from R2, optionally with a Range header.
 * Returns null if R2 is not configured or the object is not found.
 */
export async function getR2Object(
  key: string,
  range?: string
): Promise<R2ObjectResult | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Range: range,
    });
    const response = await client.send(command);

    if (!response.Body) return null;

    return {
      body: response.Body as ReadableStream,
      contentLength: response.ContentLength ?? 0,
      contentType: response.ContentType ?? "application/pdf",
      contentRange: response.ContentRange,
      statusCode: response.ContentRange ? 206 : 200,
    };
  } catch (error: unknown) {
    const name = (error as { name?: string })?.name;
    if (name === "NoSuchKey" || name === "NotFound") {
      return null;
    }
    console.error("R2 getObject error:", error);
    return null;
  }
}

/**
 * Head an object in R2 to get its size without downloading.
 */
export async function headR2Object(
  key: string
): Promise<{ contentLength: number; contentType: string } | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const command = new HeadObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    });
    const response = await client.send(command);
    return {
      contentLength: response.ContentLength ?? 0,
      contentType: response.ContentType ?? "application/pdf",
    };
  } catch {
    return null;
  }
}

export { isR2Configured };
