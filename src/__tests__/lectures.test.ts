/**
 * Unit test: lecture discovery merging logic.
 * We mock R2 and filesystem to test pure merge behavior.
 */

import { discoverLectures } from "@/lib/lectures";

// Mock the R2 module
jest.mock("@/lib/r2", () => ({
  isR2Configured: jest.fn(),
  listR2Objects: jest.fn(),
}));

// Mock fs
jest.mock("fs", () => ({
  readdirSync: jest.fn(),
}));

import { isR2Configured, listR2Objects } from "@/lib/r2";
import fs from "fs";

const mockIsR2Configured = isR2Configured as jest.MockedFunction<
  typeof isR2Configured
>;
const mockListR2Objects = listR2Objects as jest.MockedFunction<
  typeof listR2Objects
>;
const mockReaddirSync = fs.readdirSync as jest.MockedFunction<
  typeof fs.readdirSync
>;

describe("discoverLectures", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("merges R2 and local results, deduplicating by filename", async () => {
    mockIsR2Configured.mockReturnValue(true);
    mockListR2Objects.mockResolvedValue([
      { key: "test-course/Lec1_Intro.pdf", size: 1000 },
      { key: "test-course/Lec2_Advanced.pdf", size: 2000 },
    ]);
    mockReaddirSync.mockReturnValue([
      "Lec1_Intro.pdf" as unknown as fs.Dirent,
      "Lec3_Extra.pdf" as unknown as fs.Dirent,
    ]);

    const { lectures, r2Available } = await discoverLectures("test-course");

    expect(r2Available).toBe(true);
    expect(lectures).toHaveLength(3);

    const lec1 = lectures.find((l) => l.fileName === "Lec1_Intro.pdf");
    expect(lec1?.hasR2).toBe(true);
    expect(lec1?.hasFallback).toBe(true);

    const lec2 = lectures.find((l) => l.fileName === "Lec2_Advanced.pdf");
    expect(lec2?.hasR2).toBe(true);
    expect(lec2?.hasFallback).toBe(false);

    const lec3 = lectures.find((l) => l.fileName === "Lec3_Extra.pdf");
    expect(lec3?.hasR2).toBe(false);
    expect(lec3?.hasFallback).toBe(true);
  });

  it("falls back to local only when R2 is not configured", async () => {
    mockIsR2Configured.mockReturnValue(false);
    mockReaddirSync.mockReturnValue([
      "Lec1_Intro.pdf" as unknown as fs.Dirent,
    ]);

    const { lectures, r2Available } = await discoverLectures("test-course");

    expect(r2Available).toBe(false);
    expect(lectures).toHaveLength(1);
    expect(lectures[0].hasR2).toBe(false);
    expect(lectures[0].hasFallback).toBe(true);
    expect(mockListR2Objects).not.toHaveBeenCalled();
  });

  it("falls back to local when R2 listing fails (returns null)", async () => {
    mockIsR2Configured.mockReturnValue(true);
    mockListR2Objects.mockResolvedValue(null);
    mockReaddirSync.mockReturnValue([
      "Lec1_Intro.pdf" as unknown as fs.Dirent,
    ]);

    const { lectures, r2Available } = await discoverLectures("test-course");

    expect(r2Available).toBe(false);
    expect(lectures).toHaveLength(1);
    expect(lectures[0].hasFallback).toBe(true);
  });

  it("sorts by lecture number", async () => {
    mockIsR2Configured.mockReturnValue(false);
    mockReaddirSync.mockReturnValue([
      "Notes_Lec3.pdf" as unknown as fs.Dirent,
      "Notes_Lec1.pdf" as unknown as fs.Dirent,
      "Notes_Lec2.pdf" as unknown as fs.Dirent,
    ]);

    const { lectures } = await discoverLectures("test-course");

    expect(lectures[0].label).toBe("Lecture 1");
    expect(lectures[1].label).toBe("Lecture 2");
    expect(lectures[2].label).toBe("Lecture 3");
  });

  it("returns empty array when no PDFs found", async () => {
    mockIsR2Configured.mockReturnValue(false);
    mockReaddirSync.mockImplementation(() => {
      throw new Error("ENOENT");
    });

    const { lectures } = await discoverLectures("test-course");
    expect(lectures).toHaveLength(0);
  });
});
