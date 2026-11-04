import type { SacramentMeeting } from "@/lib/types";
import { formatDisplayDate, formatMeetingType } from "@/lib/format";
import PrintButton from "@/components/PrintButton";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm print:border-0 print:shadow-none">
      <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {formatMeetingType(meeting.meetingType)} Meeting
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {formatDisplayDate(meeting.date)}
          </h1>
          <p className="mt-2 text-slate-700">
            <strong>Presiding:</strong> {meeting.presiding}
          </p>
          <p className="text-slate-700">
            <strong>Conducting:</strong> {meeting.conducting}
          </p>
        </div>
        <PrintButton />
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Announcements
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {meeting.announcements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-6 grid gap-3 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Opening Hymn</h2>
          <p className="text-slate-700">
            #{meeting.openingHymn.number} — {meeting.openingHymn.title}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Opening Prayer</h2>
          <p className="text-slate-700">{meeting.openingPrayer}</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">
          Ward Business
        </h2>
        {meeting.wardBusiness.length === 0 ? (
          <p className="text-slate-700">None.</p>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-slate-700">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-slate-700">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Sacrament Hymn</h2>
        <p className="text-slate-700">
          #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">
          Speakers and Musical Numbers
        </h2>
        <ul className="space-y-3">
          {meeting.speakers.map((item) => (
            <li
              key={`${item.name}-${item.topic}`}
              className="rounded-lg bg-slate-50 p-3"
            >
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm uppercase tracking-wide text-slate-500">
                {item.type === "musical-number" ? "Musical number" : "Speaker"}
              </p>
              <p className="text-slate-700">{item.topic}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Closing Hymn</h2>
          <p className="text-slate-700">
            #{meeting.closingHymn.number} — {meeting.closingHymn.title}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Closing Prayer</h2>
          <p className="text-slate-700">{meeting.closingPrayer}</p>
        </div>
      </section>
    </article>
  );
}
