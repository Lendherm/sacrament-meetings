import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Browse, search, and paginate Sunrise Ward sacrament meeting agendas.",
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const session = await auth();
  const canManage = !!session?.user;
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-slate-900">Meetings</h1>
        {canManage ? (
          <Link
            href="/meetings/new"
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
          >
            Create Meeting
          </Link>
        ) : (
          <Link
            href="/login"
            className="rounded-md border border-brand/30 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand hover:bg-brand/10"
          >
            Sign in to manage
          </Link>
        )}
      </div>
      <p className="mb-6 text-slate-700">
        Browse planned and past sacrament meeting agendas. Search and pagination
        are driven by the URL.
      </p>

      <Suspense
        fallback={
          <div className="mb-6 h-16 animate-pulse rounded bg-slate-200" />
        }
      >
        <MeetingSearch />
      </Suspense>

      {meetings.length === 0 ? (
        <p className="text-slate-600">No meetings match your search.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              canManage={canManage}
            />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </main>
  );
}
