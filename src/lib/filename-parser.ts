export interface ParsedLecture {
  fileName: string;
  title: string;
  label: string | null;
  sortKey: number;
}

/**
 * Extract a lecture/week number from a filename.
 * Matches patterns like Lec1, Lec_02, Lecture3, Week01, Week_3, W1, etc.
 */
function extractNumber(fileName: string): { label: string; num: number } | null {
  const patterns: [RegExp, string][] = [
    [/Lec(?:ture)?[_\s-]*(\d+)/i, "Lecture"],
    [/Week[_\s-]*(\d+)/i, "Week"],
    [/W(\d+)/i, "Week"],
    [/Session[_\s-]*(\d+)/i, "Session"],
    [/Chapter[_\s-]*(\d+)/i, "Chapter"],
    [/Part[_\s-]*(\d+)/i, "Part"],
  ];

  for (const [regex, prefix] of patterns) {
    const match = fileName.match(regex);
    if (match) {
      const num = parseInt(match[1], 10);
      return { label: `${prefix} ${num}`, num };
    }
  }
  return null;
}

/**
 * Convert a PDF filename into a human-friendly title.
 * Removes course codes, file extension, and converts separators to spaces.
 */
function deriveTitle(fileName: string): string {
  let name = fileName.replace(/\.pdf$/i, "");

  // Remove common course code prefixes (e.g. CS2SD_, COMP101_, CS101A_)
  name = name.replace(/^[A-Z]{2,6}\d{1,4}[A-Z]{0,3}_/, "");

  // Remove leading "Lecture_Notes_" or similar
  name = name.replace(/^Lecture[_\s-]*Notes[_\s-]*/i, "");

  // Replace underscores and hyphens with spaces
  name = name.replace(/[_-]+/g, " ");

  // Clean up multiple spaces
  name = name.replace(/\s+/g, " ").trim();

  return name || fileName.replace(/\.pdf$/i, "");
}

/**
 * Parse a PDF filename into display-ready metadata.
 */
export function parseLectureFilename(fileName: string): ParsedLecture {
  const extracted = extractNumber(fileName);
  const title = deriveTitle(fileName);

  return {
    fileName,
    title,
    label: extracted?.label ?? null,
    sortKey: extracted?.num ?? Infinity,
  };
}
