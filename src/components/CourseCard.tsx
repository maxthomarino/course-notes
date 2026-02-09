import Link from "next/link";

interface CourseCardProps {
  slug: string;
  title: string;
  description: string;
  instructors: string[];
}

export default function CourseCard({
  slug,
  title,
  description,
  instructors,
}: CourseCardProps) {
  return (
    <Link
      href={`/courses/${slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:border-gray-400 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <p className="text-xs text-gray-400">{instructors.join(", ")}</p>
    </Link>
  );
}
