import { notFound } from "next/navigation";
import { getCourse } from "@/content/courses";
import { getLectureResources } from "@/content/further-resources";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResourceCard from "@/components/ResourceCard";

interface Props {
  params: Promise<{ courseSlug: string; lectureId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { courseSlug, lectureId } = await params;
  const course = getCourse(courseSlug);
  const resources = getLectureResources(courseSlug, lectureId);
  if (!course || !resources) return { title: "Not found" };
  return { title: `${resources.lectureTitle} — Further Resources` };
}

export default async function FurtherResourcesPage({ params }: Props) {
  const { courseSlug, lectureId } = await params;
  const course = getCourse(courseSlug);
  const resources = getLectureResources(courseSlug, lectureId);
  if (!course || !resources) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: course.title, href: `/courses/${courseSlug}` },
          { label: "Further Resources" },
        ]}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">
          {resources.lectureTitle}
        </h1>
        <p className="text-sm text-gray-500">
          Further resources and reading for this lecture.
        </p>
      </div>

      <div className="space-y-8">
        {resources.sessions.map((session) => (
          <section key={session.title}>
            <h2 className="text-lg font-semibold mb-4">{session.title}</h2>
            <div className="space-y-4">
              {session.topics.map((topic) => (
                <div key={topic.name}>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {topic.name}
                  </h3>
                  <div className="space-y-2">
                    {topic.resources.map((resource) => (
                      <ResourceCard
                        key={resource.url}
                        title={resource.title}
                        url={resource.url}
                        description={resource.description}
                        type={resource.type}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
