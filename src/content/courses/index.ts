export interface CourseDefinition {
  slug: string;
  title: string;
  description: string;
  instructors: string[];
  prefix: string; // R2 key prefix
}

export const courses: CourseDefinition[] = [
  {
    slug: "software-system-design",
    title: "Software Systems Design",
    description:
      "An introduction to object-oriented design, design patterns, and software architecture principles.",
    instructors: ["Lecturer A", "Lecturer B"],
    prefix: "software-system-design",
  },
];

export function getCourse(slug: string): CourseDefinition | undefined {
  return courses.find((c) => c.slug === slug);
}
