import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

// GET /api/meetings/1
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<SacramentMeeting | { error: string }>> {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const meeting = getMeetingById(id);

    if (!meeting) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(meeting);
  } catch {
    return NextResponse.json(
      { error: "Failed to load meeting" },
      { status: 500 }
    );
  }
}
