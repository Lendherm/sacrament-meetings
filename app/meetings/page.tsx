import MeetingCard from "@/components/MeetingCard";
import { getBaseUrl } from "@/lib/get-base-url";
import type { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic";

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch(`${getBaseUrl()}/api/meetings`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch meetings");
  }

  return res.json();
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <main>
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Meetings</h1>
      <p className="mb-8 text-slate-700">
        Browse planned and past sacrament meeting agendas for Sunrise Ward.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </main>
  );
}
