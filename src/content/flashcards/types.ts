/** A single flashcard with a question (front) and answer (back). */
export interface Flashcard {
  /** Unique ID within the deck, e.g. "q1". Used as localStorage key suffix. */
  id: string;
  /** The question shown on the front of the card. */
  front: string;
  /** The answer shown on the back of the card. */
  back: string;
  /** Optional hint shown below the question before flipping. */
  hint?: string;
}

/** A named group of related flashcards within a lecture. */
export interface FlashcardTopic {
  name: string;
  cards: Flashcard[];
}

/** All flashcards for a single lecture. */
export interface LectureFlashcards {
  courseSlug: string;
  lectureId: string;
  lectureTitle: string;
  topics: FlashcardTopic[];
}
