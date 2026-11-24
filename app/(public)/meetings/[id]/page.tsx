import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { formatDisplayDate } from "@/lib/format";
import { getMeetingById } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    return { title: "Meeting not found" };
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return { title: "Meeting not found" };
  }

  const dateLabel = formatDisplayDate(meeting.date);

  return {
    title: `Agenda · ${dateLabel}`,
    description: `Sacrament meeting agenda for ${dateLabel}. Presiding: ${meeting.presiding}. Conducting: ${meeting.conducting}.`,
  };
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (Number.isNaN(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main>
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
