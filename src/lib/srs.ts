// ────────────────────────────────────────────────────
// SM-2 Spaced Repetition Algorithm + localStorage layer
// ────────────────────────────────────────────────────

/** Rating scale matching Anki's four buttons. */
export const Rating = {
  Again: 0,
  Hard: 1,
  Good: 2,
  Easy: 3,
} as const;

export type Rating = (typeof Rating)[keyof typeof Rating];

/** Per-card SRS state persisted in localStorage. */
export interface CardState {
  /** SM-2 easiness factor (minimum 1.3, default 2.5). */
  easeFactor: number;
  /** Current interval in days. */
  interval: number;
  /** Number of consecutive correct reviews (rating >= Good). */
  repetitions: number;
  /** ISO 8601 timestamp of the next scheduled review. */
  dueDate: string;
  /** ISO 8601 timestamp of the last review. */
  lastReview: string;
}

/** Default state for a never-reviewed card. */
export function defaultCardState(): CardState {
  return {
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: new Date(0).toISOString(),
    lastReview: new Date(0).toISOString(),
  };
}

/**
 * SM-2 core: compute the next state after a review.
 *
 * Rating mapping to SM-2 quality:
 *   Again = 0 -> q=1 (reset)
 *   Hard  = 1 -> q=2 (reset, short interval)
 *   Good  = 2 -> q=4 (maintain/advance)
 *   Easy  = 3 -> q=5 (increase ease, bonus interval)
 */
export function sm2(state: CardState, rating: Rating): CardState {
  const qualityMap: Record<Rating, number> = {
    [Rating.Again]: 1,
    [Rating.Hard]: 2,
    [Rating.Good]: 4,
    [Rating.Easy]: 5,
  };
  const q = qualityMap[rating];

  let { easeFactor, interval, repetitions } = state;
  const now = new Date();

  if (q < 3) {
    // Failed or hard: reset repetitions
    repetitions = 0;
    interval = rating === Rating.Again ? 0 : 1;
  } else {
    // Successful recall
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Update ease factor: EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  // Compute next due date
  const dueDate = new Date(now);
  dueDate.setDate(dueDate.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    dueDate: dueDate.toISOString(),
    lastReview: now.toISOString(),
  };
}

// ─── localStorage layer ─────────────────────────────

const STORAGE_PREFIX = "flashcards";

function storageKey(
  courseSlug: string,
  lectureId: string,
  cardId: string,
): string {
  return `${STORAGE_PREFIX}:${courseSlug}:${lectureId}:${cardId}`;
}

/** Load a single card's SRS state. Returns default if not found. */
export function loadCardState(
  courseSlug: string,
  lectureId: string,
  cardId: string,
): CardState {
  if (typeof window === "undefined") return defaultCardState();
  try {
    const raw = localStorage.getItem(
      storageKey(courseSlug, lectureId, cardId),
    );
    if (!raw) return defaultCardState();
    return JSON.parse(raw) as CardState;
  } catch {
    return defaultCardState();
  }
}

/** Persist a single card's SRS state. */
export function saveCardState(
  courseSlug: string,
  lectureId: string,
  cardId: string,
  state: CardState,
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      storageKey(courseSlug, lectureId, cardId),
      JSON.stringify(state),
    );
  } catch {
    // localStorage full or unavailable — silently degrade
  }
}

/** Check if a card is due for review (dueDate <= now). */
export function isDue(state: CardState): boolean {
  return new Date(state.dueDate) <= new Date();
}

/**
 * Compute a human-readable interval label for a prospective rating.
 * Used to show "< 1 min", "1 d", "4 d" etc. on the rating buttons.
 */
export function intervalLabel(state: CardState, rating: Rating): string {
  const next = sm2(state, rating);
  if (next.interval === 0) return "< 1 min";
  if (next.interval === 1) return "1 d";
  return `${next.interval} d`;
}
