import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          Lecture Notes
        </Link>
        <span className="ml-3 text-xs text-gray-400 hidden sm:inline">
          University X
        </span>
      </div>
    </header>
  );
}
