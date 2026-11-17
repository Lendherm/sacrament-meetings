import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <main>
      <h1 className="text-3xl font-bold text-slate-900">Meeting not found</h1>
      <p className="mt-4 text-slate-700">
        That meeting ID does not exist, so there is nothing to edit.
      </p>
      <p className="mt-6">
        <Link href="/meetings" className="font-medium text-brand hover:underline">
          Back to meetings
        </Link>
      </p>
    </main>
  );
}
