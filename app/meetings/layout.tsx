import Link from "next/link";

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <nav
        aria-label="Meetings section"
        className="mb-8 flex flex-wrap gap-2 print:hidden"
      >
        <Link
          href="/meetings"
          className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-brand hover:bg-blue-100"
        >
          All meetings
        </Link>
        <Link
          href="/meetings/current"
          className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-brand hover:bg-blue-100"
        >
          Current Sunday
        </Link>
      </nav>
      {children}
    </section>
  );
}
