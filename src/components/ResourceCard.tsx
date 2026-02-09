import type { ResourceType } from "@/content/further-resources/types";

const badgeStyles: Record<ResourceType, string> = {
  article: "bg-blue-50 text-blue-700",
  tutorial: "bg-green-50 text-green-700",
  specification: "bg-amber-50 text-amber-700",
  book: "bg-gray-100 text-gray-700",
  video: "bg-red-50 text-red-700",
  tool: "bg-purple-50 text-purple-700",
  documentation: "bg-teal-50 text-teal-700",
};

interface ResourceCardProps {
  title: string;
  url: string;
  description: string;
  type: ResourceType;
}

export default function ResourceCard({
  title,
  url,
  description,
  type,
}: ResourceCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50/50 transition-all group"
    >
      <div className="min-w-0 flex-1 mr-4">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${badgeStyles[type]}`}
          >
            {type}
          </span>
          <span className="text-sm font-medium text-gray-900 truncate">
            {title}
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-1">{description}</p>
      </div>
      <span className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </span>
    </a>
  );
}
