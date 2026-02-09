/**
 * Integration test: /api/pdf serves fallback when R2 disabled.
 * Verifies headers and Range support.
 */

import fs from "fs";
import path from "path";

// Mock R2 to always return null (disabled)
jest.mock("@/lib/r2", () => ({
  getR2Object: jest.fn().mockResolvedValue(null),
  headR2Object: jest.fn().mockResolvedValue(null),
}));

// We test the route handler directly
import { GET, HEAD } from "@/app/api/pdf/[courseSlug]/[fileName]/route";
import { NextRequest } from "next/server";

const TEST_COURSE = "software-system-design";
const TEST_FILE = "CS2SD_Lecture_Notes_Introduction_to_OO_Design_Lec1.pdf";
const LOCAL_PATH = path.join(
  process.cwd(),
  "public",
  "pdfs",
  TEST_COURSE,
  TEST_FILE
);

function makeParams(courseSlug: string, fileName: string) {
  return { params: Promise.resolve({ courseSlug, fileName }) };
}

describe("/api/pdf/[courseSlug]/[fileName]", () => {
  const fileExists = fs.existsSync(LOCAL_PATH);

  // Skip if the test PDF is not available locally
  const describeIf = fileExists ? describe : describe.skip;

  describeIf("with local fallback PDF", () => {
    it("GET returns 200 with correct headers", async () => {
      const request = new NextRequest("http://localhost:3000/api/pdf/test/test.pdf");
      const response = await GET(request, makeParams(TEST_COURSE, TEST_FILE));

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/pdf");
      expect(response.headers.get("Accept-Ranges")).toBe("bytes");
      expect(response.headers.get("Content-Disposition")).toContain(TEST_FILE);
      expect(Number(response.headers.get("Content-Length"))).toBeGreaterThan(0);
    });

    it("GET supports Range requests with 206", async () => {
      const request = new NextRequest("http://localhost:3000/api/pdf/test/test.pdf", {
        headers: { Range: "bytes=0-1023" },
      });
      const response = await GET(request, makeParams(TEST_COURSE, TEST_FILE));

      expect(response.status).toBe(206);
      expect(response.headers.get("Content-Range")).toMatch(
        /^bytes 0-1023\/\d+$/
      );
      expect(response.headers.get("Content-Length")).toBe("1024");
    });

    it("HEAD returns 200 with Content-Length", async () => {
      const request = new NextRequest("http://localhost:3000/api/pdf/test/test.pdf", {
        method: "HEAD",
      });
      const response = await HEAD(request, makeParams(TEST_COURSE, TEST_FILE));

      expect(response.status).toBe(200);
      expect(Number(response.headers.get("Content-Length"))).toBeGreaterThan(0);
    });
  });

  it("returns 404 for missing PDF", async () => {
    const request = new NextRequest("http://localhost:3000/api/pdf/test/test.pdf");
    const response = await GET(
      request,
      makeParams(TEST_COURSE, "nonexistent.pdf")
    );

    expect(response.status).toBe(404);
  });

  it("rejects path traversal in filename", async () => {
    const request = new NextRequest("http://localhost:3000/api/pdf/test/test.pdf");
    const response = await GET(
      request,
      makeParams(TEST_COURSE, "../../../etc/passwd")
    );

    expect(response.status).toBe(400);
  });
});
