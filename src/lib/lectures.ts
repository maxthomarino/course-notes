import fs from "fs";
import path from "path";
import { listR2Objects, isR2Configured } from "./r2";
import { parseLectureFilename } from "./filename-parser";

export interface LectureInfo {
  id: string;
  fileName: string;
  title: string;
  label: string | null;
  sortKey: number;
  hasR2: boolean;
  hasFallback: boolean;
}

/**
 * List local fallback PDFs under /public/pdfs/<courseSlug>/.
 */
function listLocalPDFs(courseSlug: string): string[] {
  const dir = path.join(process.cwd(), "public", "pdfs", courseSlug);
  try {
    const files = fs.readdirSync(dir);
    return files.filter((f) => f.toLowerCase().endsWith(".pdf"));
  } catch {
    return [];
  }
}

/**
 * Discover all lectures for a course by merging R2 objects and local fallback PDFs.
 * R2 is preferred; local PDFs fill gaps when R2 is unavailable or missing objects.
 */
export async function discoverLectures(
  courseSlug: string
): Promise<{ lectures: LectureInfo[]; r2Available: boolean }> {
  const map = new Map<string, { hasR2: boolean; hasFallback: boolean }>();

  // Try R2 listing
  let r2Available = false;
  if (isR2Configured()) {
    const r2Objects = await listR2Objects(courseSlug);
    if (r2Objects !== null) {
      r2Available = true;
      for (const obj of r2Objects) {
        const fileName = obj.key.split("/").pop();
        if (fileName) {
          map.set(fileName, { hasR2: true, hasFallback: false });
        }
      }
    }
  }

  // Merge local fallback PDFs
  const localFiles = listLocalPDFs(courseSlug);
  for (const fileName of localFiles) {
    const existing = map.get(fileName);
    if (existing) {
      existing.hasFallback = true;
    } else {
      map.set(fileName, { hasR2: false, hasFallback: true });
    }
  }

  // Build lecture list
  const lectures: LectureInfo[] = [];
  for (const [fileName, sources] of map) {
    const parsed = parseLectureFilename(fileName);
    lectures.push({
      id: fileName.replace(/\.pdf$/i, ""),
      fileName,
      title: parsed.title,
      label: parsed.label,
      sortKey: parsed.sortKey,
      hasR2: sources.hasR2,
      hasFallback: sources.hasFallback,
    });
  }

  // Sort by lecture/week number, then alphabetical
  lectures.sort((a, b) => {
    if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey;
    return a.title.localeCompare(b.title);
  });

  return { lectures, r2Available };
}
