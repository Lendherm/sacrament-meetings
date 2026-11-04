import NavLinks from "@/components/NavLinks";

function formatToday(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Header() {
  const today = formatToday();

  return (
    <header className="border-b border-slate-200 bg-white print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            Sacrament Meeting Planner
          </p>
          <p className="text-2xl font-bold text-slate-900">Sunrise Ward</p>
          <p className="text-sm text-slate-600">
            <time dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
          </p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
