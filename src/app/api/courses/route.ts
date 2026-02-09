import { NextResponse } from "next/server";
import { courses } from "@/content/courses";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = courses.map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.description,
    instructors: c.instructors,
  }));

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
