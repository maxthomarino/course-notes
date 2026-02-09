import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-sm text-gray-500 mb-4">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
