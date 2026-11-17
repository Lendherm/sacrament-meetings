import Link from "next/link";
import DeleteMeetingButton from "@/components/DeleteMeetingButton";
import type { SacramentMeeting } from "@/lib/types";
import { formatDisplayDate, formatMeetingType } from "@/lib/format";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand/40 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-slate-900">
          <Link href={`/meetings/${meeting.id}`} className="hover:text-brand">
            {formatDisplayDate(meeting.date)}
          </Link>
        </h2>
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
          {formatMeetingType(meeting.meetingType)}
        </span>
      </div>
      <p className="text-slate-700">
        <strong>Presiding:</strong> {meeting.presiding}
      </p>
      <p className="text-slate-700">
        <strong>Conducting:</strong> {meeting.conducting}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="font-medium text-brand hover:underline"
        >
          View agenda
        </Link>
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded-md border border-brand/30 bg-brand/5 px-3 py-1.5 text-sm font-medium text-brand hover:bg-brand/10"
        >
          Edit
        </Link>
        <DeleteMeetingButton id={meeting.id} />
      </div>
    </article>
  );
}
