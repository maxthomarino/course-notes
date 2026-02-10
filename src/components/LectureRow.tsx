import Link from "next/link";

interface LectureRowProps {
  courseSlug: string;
  fileName: string;
  title: string;
  label: string | null;
  resourcesHref?: string;
  flashcardsHref?: string;
}

export default function LectureRow({
  courseSlug,
  fileName,
  title,
  label,
  resourcesHref,
  flashcardsHref,
}: LectureRowProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all group">
      <div className="min-w-0 flex-1 mr-4">
        <div className="flex items-center gap-2">
          {label && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded">
              {label}
            </span>
          )}
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {resourcesHref && (
          <Link
            href={resourcesHref}
            className="shrink-0 inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
          >
            Resources
          </Link>
        )}
        {flashcardsHref && (
          <Link
            href={flashcardsHref}
            className="shrink-0 inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          >
            Flashcards
          </Link>
        )}
        {fileName && (
          <Link
            href={`/courses/${courseSlug}/lectures/${encodeURIComponent(fileName)}`}
            className="shrink-0 inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            View PDF
          </Link>
        )}
      </div>
    </div>
  );
}
