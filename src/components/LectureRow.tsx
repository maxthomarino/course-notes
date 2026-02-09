import Link from "next/link";

interface LectureRowProps {
  courseSlug: string;
  fileName: string;
  title: string;
  label: string | null;
}

export default function LectureRow({
  courseSlug,
  fileName,
  title,
  label,
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
      <Link
        href={`/courses/${courseSlug}/lectures/${encodeURIComponent(fileName)}`}
        className="shrink-0 inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        View PDF
      </Link>
    </div>
  );
}
