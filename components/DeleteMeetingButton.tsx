import { deleteMeeting } from "@/lib/actions";

export default function DeleteMeetingButton({ id }: { id: number }) {
  const deleteWithId = deleteMeeting.bind(null, String(id));

  return (
    <form action={deleteWithId}>
      <button
        type="submit"
        className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
      >
        Delete
      </button>
    </form>
  );
}
