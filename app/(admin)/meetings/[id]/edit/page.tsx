export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main>
      <h1 className="text-3xl font-bold text-slate-900">
        Edit Meeting {id} — Coming in Week 04
      </h1>
      <p className="mt-4 text-slate-700">
        Meeting edit forms will be implemented next week.
      </p>
    </main>
  );
}
