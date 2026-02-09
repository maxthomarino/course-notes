import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourse } from "@/content/courses";
import { parseLectureFilename } from "@/lib/filename-parser";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Props {
  params: Promise<{ courseSlug: string; fileName: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { courseSlug, fileName } = await params;
  const course = getCourse(courseSlug);
  if (!course) return { title: "Not found" };
  const parsed = parseLectureFilename(decodeURIComponent(fileName));
  return { title: `${parsed.title} — ${course.title}` };
}

export default async function LectureViewerPage({ params }: Props) {
  const { courseSlug, fileName: rawFileName } = await params;
  const fileName = decodeURIComponent(rawFileName);
  const course = getCourse(courseSlug);
  if (!course) notFound();

  const parsed = parseLectureFilename(fileName);
  const pdfUrl = `/api/pdf/${courseSlug}/${encodeURIComponent(fileName)}`;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: course.title, href: `/courses/${courseSlug}` },
          { label: parsed.label ?? parsed.title },
        ]}
      />

      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div className="min-w-0">
          <h1 className="text-xl font-bold truncate">{parsed.title}</h1>
          {parsed.label && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded mt-1">
              {parsed.label}
            </span>
          )}
        </div>
        <a
          href={pdfUrl}
          download={fileName}
          className="shrink-0 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download PDF
        </a>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <iframe
          src={pdfUrl}
          title={parsed.title}
          className="w-full border-0"
          style={{ height: "calc(100vh - 240px)", minHeight: "500px" }}
        />
      </div>

      <div className="mt-4 text-center">
        <Link
          href={`/courses/${courseSlug}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to {course.title}
        </Link>
      </div>
    </>
  );
}
