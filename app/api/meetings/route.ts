import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";
import type { SacramentMeeting } from "@/lib/types";

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(
  request: NextRequest
): Promise<NextResponse<SacramentMeeting[] | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") ?? undefined;

    if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Invalid date. Use YYYY-MM-DD." },
        { status: 400 }
      );
    }

    const meetings = getMeetings(date);
    return NextResponse.json(meetings);
  } catch {
    return NextResponse.json(
      { error: "Failed to load meetings" },
      { status: 500 }
    );
  }
}
