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
  {
    slug: "operating-systems-and-computer-networking",
    title: "Operating Systems and Computer Networking",
    description:
      "An introduction to operating system concepts, CPU scheduling, memory management, I/O devices, and computer networking fundamentals.",
    instructors: ["Lecturer A"],
    prefix: "operating-systems-and-computer-networking",
  },
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description:
      "Foundational concepts of AI and machine learning, including rational agents, supervised and unsupervised learning, deep learning, and the ML pipeline.",
    instructors: ["Lecturer C"],
    prefix: "artificial-intelligence",
  },
  {
    slug: "personal",
    title: "Personal",
    description: "Personal notes and flashcards.",
    instructors: [],
    prefix: "personal",
  },
];

export function getCourse(slug: string): CourseDefinition | undefined {
  return courses.find((c) => c.slug === slug);
}
