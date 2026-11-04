import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getBaseUrl } from "@/lib/get-base-url";
import type { SacramentMeeting } from "@/lib/types";

export const dynamic = "force-dynamic";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const res = await fetch(`${getBaseUrl()}/api/meetings/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404 || res.status === 400) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch meeting");
  }

  return res.json();
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
