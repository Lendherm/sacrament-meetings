import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

function sanitizeQuery(raw: string): string {
  return raw.trim().slice(0, 100).replace(/[%_\\]/g, "");
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const safeQuery = sanitizeQuery(query);
  const searchTerm = `%${safeQuery}%`;
  const page =
    Number.isFinite(currentPage) && currentPage > 0
      ? Math.floor(currentPage)
      : 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  if (safeQuery) {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE
        presiding ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows as unknown as SacramentMeeting[];
  }

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ""
): Promise<number> {
  const safeQuery = sanitizeQuery(query);
  const searchTerm = `%${safeQuery}%`;

  if (safeQuery) {
    const rows = await sql`
      SELECT COUNT(*)::text AS count FROM meetings
      WHERE
        presiding ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm}
    `;
    const count = Number(rows[0]?.count ?? 0);
    return Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));
  }

  const rows = await sql`
    SELECT COUNT(*)::text AS count FROM meetings
  `;
  const count = Number(rows[0]?.count ?? 0);
  return Math.max(1, Math.ceil(count / ITEMS_PER_PAGE));
}

/** Used by API routes: all meetings, optional exact date filter. */
export async function listMeetings(
  date?: string | null
): Promise<SacramentMeeting[]> {
  if (date) {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE to_char(date, 'YYYY-MM-DD') = ${date}
      ORDER BY date DESC
    `;
    return rows as unknown as SacramentMeeting[];
  }

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    ORDER BY date DESC
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

/** Most recent Sunday on or before today (local date). */
export function getMostRecentSundayIso(today = new Date()): string {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayOfMonth}`;
}

export async function getCurrentSundayMeeting(): Promise<SacramentMeeting | null> {
  const sunday = getMostRecentSundayIso();
  const exact = await listMeetings(sunday);
  if (exact[0]) return exact[0];

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE date <= ${sunday}::date
    ORDER BY date DESC
    LIMIT 1
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — wired to the database in Week 04
export async function addMeeting(
  data: Omit<SacramentMeeting, "id">
): Promise<SacramentMeeting> {
  void data;
  throw new Error("addMeeting: database implementation coming in Week 04");
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  void id;
  void updates;
  throw new Error("updateMeeting: database implementation coming in Week 04");
}

export async function deleteMeeting(id: number): Promise<boolean> {
  void id;
  throw new Error("deleteMeeting: database implementation coming in Week 04");
}
