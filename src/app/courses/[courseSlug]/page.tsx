import { notFound } from "next/navigation";
import { getCourse } from "@/content/courses";
import { getResourcesForCourse } from "@/content/further-resources";
import { getFlashcardsForCourse } from "@/content/flashcards";
import { discoverLectures } from "@/lib/lectures";
import Breadcrumbs from "@/components/Breadcrumbs";
import LectureList from "@/components/LectureList";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ courseSlug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: "Course not found" };
  return { title: `${course.title} — Lecture Notes` };
}

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();

  const { lectures, r2Available } = await discoverLectures(courseSlug);

  const courseResources = getResourcesForCourse(courseSlug);
  const resourceLinks: Record<string, string> = {};
  for (const r of courseResources) {
    resourceLinks[r.lectureId] = `/courses/${courseSlug}/further-resources/${r.lectureId}`;
  }

  const courseFlashcards = getFlashcardsForCourse(courseSlug);
  const flashcardLinks: Record<string, string> = {};
  for (const f of courseFlashcards) {
    flashcardLinks[f.lectureId] = `/courses/${courseSlug}/flashcards/${f.lectureId}`;
  }

  // Inject synthetic rows for flashcard-only decks (no matching PDF)
  const existingSortKeys = new Set(lectures.map((l) => l.sortKey));
  for (const f of courseFlashcards) {
    const match = f.lectureId.match(/^lecture(\d+)$/);
    const sortKey = match ? parseInt(match[1], 10) : 0;
    if (!existingSortKeys.has(sortKey)) {
      lectures.push({
        id: f.lectureId,
        fileName: "",
        title: f.lectureTitle,
        label: null,
        sortKey,
        hasR2: false,
        hasFallback: false,
      });
      existingSortKeys.add(sortKey);
    }
  }
  lectures.sort((a, b) => {
    if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey;
    return a.title.localeCompare(b.title);
  });

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: course.title }]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
        <p className="text-sm text-gray-500">{course.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          {course.instructors.join(", ")}
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-3">
        Lecture Notes{" "}
        <span className="text-sm font-normal text-gray-400">
          ({lectures.length})
        </span>
      </h2>

      <LectureList
        courseSlug={courseSlug}
        lectures={lectures}
        r2Available={r2Available}
        resourceLinks={resourceLinks}
        flashcardLinks={flashcardLinks}
      />
    </>
  );
}
