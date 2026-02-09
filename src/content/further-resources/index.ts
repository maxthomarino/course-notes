export type { ResourceType, Resource, Topic, Session, LectureResources } from "./types";

import type { LectureResources } from "./types";
import ssdLecture1 from "./software-system-design/lecture1";

const allResources: LectureResources[] = [ssdLecture1];

export function getLectureResources(
  courseSlug: string,
  lectureId: string,
): LectureResources | undefined {
  return allResources.find(
    (r) => r.courseSlug === courseSlug && r.lectureId === lectureId,
  );
}

export function getResourcesForCourse(
  courseSlug: string,
): LectureResources[] {
  return allResources.filter((r) => r.courseSlug === courseSlug);
}
