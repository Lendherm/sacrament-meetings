import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <main>
      <h1 className="mb-2 text-3xl font-bold text-slate-900">Meetings</h1>
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
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </main>
  );
}
