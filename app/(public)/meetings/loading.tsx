export default function MeetingsLoading() {
  return (
    <div className="animate-pulse space-y-6" role="status" aria-live="polite">
      <div className="space-y-3">
        <div className="h-9 w-48 rounded bg-slate-200" />
        <div className="h-4 w-full max-w-xl rounded bg-slate-200" />
        <div className="h-10 w-full rounded bg-slate-200" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-40 rounded-xl bg-slate-200" />
        <div className="h-40 rounded-xl bg-slate-200" />
        <div className="h-40 rounded-xl bg-slate-200" />
        <div className="h-40 rounded-xl bg-slate-200" />
      </div>
      <span className="sr-only">Loading meetings…</span>
    </div>
  );
}
