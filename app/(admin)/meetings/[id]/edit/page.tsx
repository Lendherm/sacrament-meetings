import Link from "next/link";
import { notFound } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { updateMeeting } from "@/lib/actions";
import { getMeetingById } from "@/lib/meetings-db";

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId < 1) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);
  if (!meeting) {
    notFound();
  }

  const updateMeetingWithId = updateMeeting.bind(null, id);

  return (
    <main>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Meeting #{meeting.id}
        </h1>
        <Link href="/meetings" className="text-sm font-medium text-brand hover:underline">
          Back to meetings
        </Link>
      </div>
      <p className="mb-6 text-slate-700">
        Update the agenda for {meeting.date}.
      </p>
      <MeetingForm
        action={updateMeetingWithId}
        meeting={meeting}
        submitLabel="Update Meeting"
      />
    </main>
  );
}
