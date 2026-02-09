import { courses } from "@/content/courses";
import CourseCard from "@/components/CourseCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function HomePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home" }]} />
      <h1 className="text-2xl font-bold mb-1">Courses</h1>
      <p className="text-sm text-gray-500 mb-6">
        Browse available lecture notes below.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            slug={course.slug}
            title={course.title}
            description={course.description}
            instructors={course.instructors}
          />
        ))}
      </div>
    </>
  );
}
