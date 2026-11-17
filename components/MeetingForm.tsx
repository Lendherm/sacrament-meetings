"use client";

import { useActionState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import type { State } from "@/lib/actions";

const initialState: State = { message: null, errors: {} };

interface MeetingFormProps {
  action: (prevState: State, formData: FormData) => Promise<State>;
  meeting?: SacramentMeeting;
  submitLabel: string;
}

function speakersToText(meeting?: SacramentMeeting): string {
  if (!meeting?.speakers?.length) return "";
  return meeting.speakers
    .map((speaker) => `${speaker.name}|${speaker.topic}|${speaker.type}`)
    .join("\n");
}

export default function MeetingForm({
  action,
  meeting,
  submitLabel,
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-700">
          Meeting date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={meeting?.date}
          aria-describedby="date-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="meetingType"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Meeting type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={meeting?.meetingType ?? "regular"}
          aria-describedby="meetingType-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div id="meetingType-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingType?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="presiding"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            required
            defaultValue={meeting?.presiding}
            aria-describedby="presiding-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state.errors?.presiding?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="conducting"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            required
            defaultValue={meeting?.conducting}
            aria-describedby="conducting-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="announcements"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={meeting?.announcements?.join("\n") ?? ""}
          aria-describedby="announcements-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
        <div id="announcements-error" aria-live="polite" aria-atomic="true">
          {state.errors?.announcements?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="openingHymnNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Opening hymn #
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            min={1}
            required
            defaultValue={meeting?.openingHymn.number}
            aria-describedby="openingHymnNumber-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingHymnNumber?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="openingHymnTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Opening hymn title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            required
            defaultValue={meeting?.openingHymn.title}
            aria-describedby="openingHymnTitle-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingHymnTitle?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="openingPrayer"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Opening prayer
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          required
          defaultValue={meeting?.openingPrayer}
          aria-describedby="openingPrayer-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
        <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="wardBusiness"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Ward business (one item per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          defaultValue={
            meeting?.wardBusiness?.map((item) => item.description).join("\n") ??
            ""
          }
          aria-describedby="wardBusiness-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
        <div id="wardBusiness-error" aria-live="polite" aria-atomic="true">
          {state.errors?.wardBusiness?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={meeting?.stakeBusiness}
          value="on"
          aria-describedby="stakeBusiness-error"
          className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-700">
          Includes stake business
        </label>
      </div>
      <div id="stakeBusiness-error" aria-live="polite" aria-atomic="true">
        {state.errors?.stakeBusiness?.map((error) => (
          <p key={error} className="text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="sacramentHymnNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sacrament hymn #
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            min={1}
            required
            defaultValue={meeting?.sacramentHymn.number}
            aria-describedby="sacramentHymnNumber-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sacramentHymnNumber?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="sacramentHymnTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sacrament hymn title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            required
            defaultValue={meeting?.sacramentHymn.title}
            aria-describedby="sacramentHymnTitle-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sacramentHymnTitle?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="speakers"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Speakers (one per line: name|topic|speaker or musical-number)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={4}
          defaultValue={speakersToText(meeting)}
          aria-describedby="speakers-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
        <div id="speakers-error" aria-live="polite" aria-atomic="true">
          {state.errors?.speakers?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="closingHymnNumber"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Closing hymn #
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            min={1}
            required
            defaultValue={meeting?.closingHymn.number}
            aria-describedby="closingHymnNumber-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingHymnNumber?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="closingHymnTitle"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Closing hymn title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            required
            defaultValue={meeting?.closingHymn.title}
            aria-describedby="closingHymnTitle-error"
            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
          />
          <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingHymnTitle?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="closingPrayer"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Closing prayer
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          required
          defaultValue={meeting?.closingPrayer}
          aria-describedby="closingPrayer-error"
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand focus:ring-2"
        />
        <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingPrayer?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {state.message ? (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-60"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
