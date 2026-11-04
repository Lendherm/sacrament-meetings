import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[420px] overflow-hidden">
        <Image
          src="/chapel.png"
          alt="Latter-day Saint sacrament meeting in a chapel with congregation, pulpit, and sacrament table"
          width={1200}
          height={700}
          priority
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#002e5d]/65" />
        <div className="relative mx-auto flex min-h-[420px] max-w-5xl flex-col justify-center px-4 py-16 text-white">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#9ad0f5]">
            Sunrise Ward
          </p>
          <h1 className="max-w-2xl text-4xl font-bold sm:text-5xl">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-100">
            Help bishoprics and branch leaders plan agendas, and let members
            view or print current and past meeting programs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/meetings"
              className="rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark"
            >
              Browse meetings
            </Link>
            <Link
              href="/meetings/current"
              className="rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
            >
              Current Sunday
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-12 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Plan</h2>
          <p className="mt-2 text-slate-700">
            Track hymns, prayers, speakers, musical numbers, and ward business
            for each Sunday.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Review</h2>
          <p className="mt-2 text-slate-700">
            Open any past or current agenda with a clean detail view for leaders
            and clerks.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-bold text-slate-900">Print</h2>
          <p className="mt-2 text-slate-700">
            Print member-friendly programs directly from a meeting detail page.
          </p>
        </div>
      </section>
    </main>
  );
}
