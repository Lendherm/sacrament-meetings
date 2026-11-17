import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";
import { createMeeting } from "@/lib/actions";

export default function CreateMeetingPage() {
  return (
    <main>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Create Meeting</h1>
        <Link href="/meetings" className="text-sm font-medium text-brand hover:underline">
          Back to meetings
        </Link>
      </div>
      <p className="mb-6 text-slate-700">
        Add a new sacrament meeting agenda to the ward calendar.
      </p>
      <MeetingForm action={createMeeting} submitLabel="Save Meeting" />
    </main>
  );
}
