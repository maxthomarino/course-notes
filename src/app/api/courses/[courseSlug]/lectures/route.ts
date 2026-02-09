import { NextRequest, NextResponse } from "next/server";
import { getCourse } from "@/content/courses";
import { discoverLectures } from "@/lib/lectures";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ courseSlug: string }> }
) {
  const { courseSlug } = await params;

  const course = getCourse(courseSlug);
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const { lectures, r2Available } = await discoverLectures(courseSlug);

  return NextResponse.json(
    { courseSlug, lectures, r2Available },
    {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    }
  );
}
