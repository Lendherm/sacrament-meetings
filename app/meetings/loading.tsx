export default function MeetingsLoading() {
  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600"
      role="status"
      aria-live="polite"
    >
      Loading meetings…
    </div>
  );
}
