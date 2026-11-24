import Link from "next/link";
import { auth } from "@/auth";
import NavLinks from "@/components/NavLinks";
import SignOutButton from "@/components/SignOutButton";

function formatToday(date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Header() {
  const session = await auth();
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
        <div className="flex flex-wrap items-center gap-4">
          <NavLinks />
          {session?.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">{session.user.email}</span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand/90"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
