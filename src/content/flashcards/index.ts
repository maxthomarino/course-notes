export type { Flashcard, FlashcardTopic, LectureFlashcards } from "./types";

import type { LectureFlashcards } from "./types";
import ssdLecture1 from "./software-system-design/lecture1";

const allFlashcards: LectureFlashcards[] = [ssdLecture1];

export function getLectureFlashcards(
  courseSlug: string,
  lectureId: string,
): LectureFlashcards | undefined {
  return allFlashcards.find(
    (f) => f.courseSlug === courseSlug && f.lectureId === lectureId,
  );
}

export function getFlashcardsForCourse(
  courseSlug: string,
): LectureFlashcards[] {
  return allFlashcards.filter((f) => f.courseSlug === courseSlug);
}
