"use client";

import { useState } from "react";
import SearchBox from "./SearchBox";
import LectureRow from "./LectureRow";

interface Lecture {
  id: string;
  fileName: string;
  title: string;
  label: string | null;
  sortKey: number;
  hasR2: boolean;
  hasFallback: boolean;
}

interface LectureListProps {
  courseSlug: string;
  lectures: Lecture[];
  r2Available: boolean;
}

export default function LectureList({
  courseSlug,
  lectures,
  r2Available,
}: LectureListProps) {
  const [query, setQuery] = useState("");

  const filtered = lectures.filter((lec) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      lec.title.toLowerCase().includes(q) ||
      (lec.label && lec.label.toLowerCase().includes(q)) ||
      lec.fileName.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {!r2Available && lectures.some((l) => !l.hasR2) && (
        <div
          role="status"
          className="mb-4 px-3 py-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg"
        >
          Using local backup — primary storage is unavailable.
        </div>
      )}

      <div className="mb-4">
        <SearchBox value={query} onChange={setQuery} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          {query ? "No lectures match your search." : "No lectures available yet."}
        </p>
      ) : (
        <div className="space-y-2">
          {filtered.map((lec) => (
            <LectureRow
              key={lec.id}
              courseSlug={courseSlug}
              fileName={lec.fileName}
              title={lec.title}
              label={lec.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}
