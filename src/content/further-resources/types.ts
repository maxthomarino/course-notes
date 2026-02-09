export type ResourceType =
  | "article"
  | "video"
  | "specification"
  | "tutorial"
  | "book"
  | "tool"
  | "documentation";

export interface Resource {
  title: string;
  url: string;
  description: string;
  type: ResourceType;
}

export interface Topic {
  name: string;
  resources: Resource[];
}

export interface Session {
  title: string;
  topics: Topic[];
}

export interface LectureResources {
  courseSlug: string;
  lectureId: string;
  lectureTitle: string;
  sessions: Session[];
}
