import { notFound } from "next/navigation";
import { getCourse } from "@/content/courses";
import { getLectureFlashcards } from "@/content/flashcards";
import Breadcrumbs from "@/components/Breadcrumbs";
import FlashcardDeck from "@/components/FlashcardDeck";

interface Props {
  params: Promise<{ courseSlug: string; lectureId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { courseSlug, lectureId } = await params;
  const course = getCourse(courseSlug);
  const flashcards = getLectureFlashcards(courseSlug, lectureId);
  if (!course || !flashcards) return { title: "Not found" };
  return { title: `${flashcards.lectureTitle} — Flashcards` };
}

export default async function FlashcardsPage({ params }: Props) {
  const { courseSlug, lectureId } = await params;
  const course = getCourse(courseSlug);
  const flashcards = getLectureFlashcards(courseSlug, lectureId);
  if (!course || !flashcards) notFound();

  const allCards = flashcards.topics.flatMap((topic) =>
    topic.cards.map((card) => ({ ...card, topicName: topic.name })),
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: course.title, href: `/courses/${courseSlug}` },
          { label: "Flashcards" },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {flashcards.lectureTitle}
        </h1>
        <p className="text-sm text-gray-500">
          Review flashcards for this lecture. Rate each card to schedule it
          using spaced repetition.
        </p>
      </div>

      <FlashcardDeck
        courseSlug={courseSlug}
        lectureId={lectureId}
        cards={allCards}
      />
    </>
  );
}
