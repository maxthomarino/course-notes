"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Rating,
  loadCardState,
  saveCardState,
  isDue,
  sm2,
  intervalLabel,
  type CardState,
} from "@/lib/srs";

interface CardWithTopic {
  id: string;
  front: string;
  back: string;
  hint?: string;
  topicName: string;
}

interface FlashcardDeckProps {
  courseSlug: string;
  lectureId: string;
  cards: CardWithTopic[];
}

const BATCH_SIZE = 6;

const PASS_THRESHOLD: Record<Rating, number> = {
  [Rating.Again]: Infinity,
  [Rating.Hard]: 3,
  [Rating.Good]: 2,
  [Rating.Easy]: 1,
};

const RATING_BUTTONS = [
  {
    rating: Rating.Again,
    label: "Again",
    key: "1",
    color:
      "text-red-700 bg-red-50 hover:bg-red-100 focus:ring-red-500",
  },
  {
    rating: Rating.Hard,
    label: "Hard",
    key: "2",
    color:
      "text-amber-700 bg-amber-50 hover:bg-amber-100 focus:ring-amber-500",
  },
  {
    rating: Rating.Good,
    label: "Good",
    key: "3",
    color:
      "text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500",
  },
  {
    rating: Rating.Easy,
    label: "Easy",
    key: "4",
    color:
      "text-blue-700 bg-blue-50 hover:bg-blue-100 focus:ring-blue-500",
  },
] as const;

function buildOrderedCards(
  cards: CardWithTopic[],
  states: Map<string, CardState>,
): CardWithTopic[] {
  const due: CardWithTopic[] = [];
  const newCards: CardWithTopic[] = [];
  const upcoming: CardWithTopic[] = [];

  for (const card of cards) {
    const s = states.get(card.id)!;
    if (s.repetitions === 0) {
      newCards.push(card);
    } else if (isDue(s)) {
      due.push(card);
    } else {
      upcoming.push(card);
    }
  }

  return [...due, ...newCards, ...upcoming];
}

export default function FlashcardDeck({
  courseSlug,
  lectureId,
  cards,
}: FlashcardDeckProps) {
  const [cardStates, setCardStates] = useState<Map<string, CardState>>(
    new Map(),
  );
  const [batch, setBatch] = useState<CardWithTopic[]>([]);
  const [remaining, setRemaining] = useState<CardWithTopic[]>([]);
  const [batchPassCounts, setBatchPassCounts] = useState<Map<string, number>>(
    new Map(),
  );
  const [graduated, setGraduated] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load SRS state from localStorage on mount
  useEffect(() => {
    const states = new Map<string, CardState>();
    for (const card of cards) {
      states.set(card.id, loadCardState(courseSlug, lectureId, card.id));
    }
    setCardStates(states);

    const ordered = buildOrderedCards(cards, states);
    setBatch(ordered.slice(0, BATCH_SIZE));
    setRemaining(ordered.slice(BATCH_SIZE));
    setBatchPassCounts(new Map());
    setGraduated(0);
    setSessionComplete(ordered.length === 0);
    setMounted(true);
  }, [cards, courseSlug, lectureId]);

  // Auto-refill batch when empty
  useEffect(() => {
    if (batch.length === 0 && mounted && !sessionComplete) {
      if (remaining.length > 0) {
        setBatch(remaining.slice(0, BATCH_SIZE));
        setRemaining(remaining.slice(BATCH_SIZE));
        setBatchPassCounts(new Map());
      } else {
        setSessionComplete(true);
      }
    }
  }, [batch.length, remaining, mounted, sessionComplete]);

  // Rate handler
  const handleRate = useCallback(
    (rating: Rating) => {
      const card = batch[0];
      if (!card) return;

      const current = cardStates.get(card.id);
      if (!current) return;

      const next = sm2(current, rating);

      // Persist
      saveCardState(courseSlug, lectureId, card.id, next);
      setCardStates((prev) => new Map(prev).set(card.id, next));

      setFlipped(false);

      if (rating === Rating.Again) {
        // Reset pass count, move to end of batch
        setBatchPassCounts((prev) => {
          const m = new Map(prev);
          m.set(card.id, 0);
          return m;
        });
        setBatch((prev) => [...prev.slice(1), prev[0]]);
      } else {
        const newCount = (batchPassCounts.get(card.id) ?? 0) + 1;
        if (newCount >= PASS_THRESHOLD[rating]) {
          // Graduate: remove from batch
          setBatch((prev) => prev.slice(1));
          setGraduated((g) => g + 1);
        } else {
          // Not yet graduated: update count, move to end of batch
          setBatchPassCounts((prev) => {
            const m = new Map(prev);
            m.set(card.id, newCount);
            return m;
          });
          setBatch((prev) => [...prev.slice(1), prev[0]]);
        }
      }
    },
    [batch, batchPassCounts, cardStates, courseSlug, lectureId],
  );

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (sessionComplete || !mounted) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
      if (flipped) {
        if (e.key === "1") handleRate(Rating.Again);
        if (e.key === "2") handleRate(Rating.Hard);
        if (e.key === "3") handleRate(Rating.Good);
        if (e.key === "4") handleRate(Rating.Easy);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flipped, sessionComplete, mounted, handleRate]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="text-sm text-gray-500 py-8 text-center">
        Loading flashcards…
      </div>
    );
  }

  // Session complete screen
  if (sessionComplete) {
    const dueCount = cards.filter((c) => {
      const s = cardStates.get(c.id);
      return s && isDue(s);
    }).length;

    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-lg font-semibold mb-2">Session Complete</h2>
        <p className="text-sm text-gray-500 mb-1">
          You have reviewed all due cards for this lecture.
        </p>
        <p className="text-xs text-gray-400">
          {dueCount} card{dueCount !== 1 ? "s" : ""} due · {cards.length}{" "}
          total
        </p>
        <button
          onClick={() => {
            setFlipped(false);
            setSessionComplete(false);
            setGraduated(0);
            setBatchPassCounts(new Map());
            // Rebuild from current states
            const ordered = buildOrderedCards(cards, cardStates);
            setBatch(
              ordered.length > 0
                ? ordered.slice(0, BATCH_SIZE)
                : cards.slice(0, BATCH_SIZE),
            );
            setRemaining(
              ordered.length > 0
                ? ordered.slice(BATCH_SIZE)
                : cards.slice(BATCH_SIZE),
            );
          }}
          className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Study Again
        </button>
      </div>
    );
  }

  const card = batch[0];
  if (!card) return null;

  const state = cardStates.get(card.id);
  if (!state) return null;

  const progress = `${graduated} / ${cards.length} complete`;
  const batchInfo = `${batch.length} left in batch`;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400">{card.topicName}</span>
        <span className="text-xs text-gray-400">
          {progress} · {batchInfo}
        </span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative min-h-[200px] border border-gray-200 rounded-lg bg-white shadow-sm cursor-pointer select-none"
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full min-h-[200px] transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-base text-gray-900 text-center font-medium">
              {card.front}
            </p>
            {card.hint && (
              <p className="mt-3 text-xs text-gray-400 text-center italic">
                Hint: {card.hint}
              </p>
            )}
            <p className="mt-6 text-xs text-gray-300">
              Click or press Space to reveal
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-lg bg-gray-50"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-base text-gray-900 text-center whitespace-pre-line">
              {card.back}
            </p>
          </div>
        </div>
      </div>

      {/* Rating buttons */}
      {flipped && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {RATING_BUTTONS.map(({ rating, label, key, color }) => (
            <button
              key={label}
              onClick={() => handleRate(rating)}
              className={`flex flex-col items-center py-2 px-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${color}`}
            >
              <span>{label}</span>
              <span className="text-xs opacity-60 mt-0.5">
                {intervalLabel(state, rating)}
              </span>
              <span className="text-[10px] opacity-40 mt-0.5">[{key}]</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
