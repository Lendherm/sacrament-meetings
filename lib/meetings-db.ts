import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-10-05",
    meetingType: "regular",
    presiding: "Bishop Luis Ramirez",
    conducting: "Brother Ethan Cole",
    announcements: [
      "Youth activity this Friday at 7:00 PM",
      "Temple trip signup sheets are in the foyer",
    ],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Maria Lopez",
    wardBusiness: [
      { description: "Release of Primary teacher Sister Anna Kim" },
      { description: "Sustaining of Brother Noah Park as Primary teacher" },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      {
        name: "Sister Ava Chen",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Ward Choir",
        topic: "Come, Follow Me",
        type: "musical-number",
      },
      {
        name: "Brother Jacob Miles",
        topic: "Daily repentance",
        type: "speaker",
      },
    ],
    closingHymn: { number: 100, title: "Nearer, My God, to Thee" },
    closingPrayer: "Brother Daniel Ortiz",
  },
  {
    id: 2,
    date: "2026-10-12",
    meetingType: "testimony",
    presiding: "Bishop Luis Ramirez",
    conducting: "Sister Elena Vargas",
    announcements: ["Fast Sunday — please remember donations"],
    openingHymn: { number: 19, title: "We Thank Thee, O God, for a Prophet" },
    openingPrayer: "Brother Sam Rivera",
    wardBusiness: [{ description: "Welcome of new members the Jensen family" }],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
    speakers: [
      {
        name: "Open microphone",
        topic: "Ward testimony meeting",
        type: "speaker",
      },
    ],
    closingHymn: { number: 152, title: "God Be with You Till We Meet Again" },
    closingPrayer: "Sister Hannah Brooks",
  },
  {
    id: 3,
    date: "2026-10-19",
    meetingType: "regular",
    presiding: "Bishop Luis Ramirez",
    conducting: "Brother Ethan Cole",
    announcements: [
      "Stake conference next week — no sacrament meeting in the ward",
    ],
    openingHymn: { number: 227, title: "There Is Sunshine in My Soul Today" },
    openingPrayer: "Sister Olivia Grant",
    wardBusiness: [
      { description: "Call of Sister Mia Torres as Relief Society counselor" },
    ],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      {
        name: "Elder Priests Quorum",
        topic: "Instrumental hymn",
        type: "musical-number",
      },
      {
        name: "Sister Grace Bennett",
        topic: "Ministering with love",
        type: "speaker",
      },
      {
        name: "Brother Caleb Snow",
        topic: "Keeping covenants",
        type: "speaker",
      },
    ],
    closingHymn: { number: 308, title: "Love One Another" },
    closingPrayer: "Brother Leo Hansen",
  },
  {
    id: 4,
    date: "2026-10-26",
    meetingType: "stake",
    presiding: "Stake President Mark Jensen",
    conducting: "Stake President Mark Jensen",
    announcements: [
      "Stake conference Saturday evening and Sunday morning sessions",
    ],
    openingHymn: { number: 3, title: "Now Let Us Rejoice" },
    openingPrayer: "Sister Rachel Adams",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      {
        name: "Sister Stake Relief Society President",
        topic: "Discipleship at home",
        type: "speaker",
      },
      {
        name: "Stake Choir",
        topic: "How Firm a Foundation",
        type: "musical-number",
      },
      {
        name: "Stake President Mark Jensen",
        topic: "Come unto Christ",
        type: "speaker",
      },
    ],
    closingHymn: { number: 136, title: "I Know That My Redeemer Lives" },
    closingPrayer: "Brother Stake Executive Secretary",
  },
  {
    id: 5,
    date: "2026-11-02",
    meetingType: "general",
    presiding: "Bishop Luis Ramirez",
    conducting: "Bishop Luis Ramirez",
    announcements: [
      "General conference weekend — members invited to watch from home or the chapel overflow",
    ],
    openingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    openingPrayer: "Sister Naomi Price",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: "O God, the Eternal Father" },
    speakers: [
      {
        name: "Broadcast program",
        topic: "General Conference sessions",
        type: "speaker",
      },
    ],
    closingHymn: { number: 113, title: "Our Savior's Love" },
    closingPrayer: "Brother Owen Clarke",
  },
  {
    id: 6,
    date: "2026-11-09",
    meetingType: "regular",
    presiding: "Bishop Luis Ramirez",
    conducting: "Sister Elena Vargas",
    announcements: [
      "Choir practice Wednesday at 6:30 PM",
      "Service project signup on the bulletin board",
    ],
    openingHymn: { number: 249, title: "Called to Serve" },
    openingPrayer: "Brother Henry Walsh",
    wardBusiness: [
      { description: "Sustaining of Brother Ian Brooks as Young Men adviser" },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 191, title: "Behold the Great Redeemer Die" },
    speakers: [
      {
        name: "Sister Lily Morgan",
        topic: "Gratitude",
        type: "speaker",
      },
      {
        name: "Primary children",
        topic: "I Am a Child of God",
        type: "musical-number",
      },
      {
        name: "Brother Mateo Ruiz",
        topic: "The Book of Mormon",
        type: "speaker",
      },
    ],
    closingHymn: { number: 94, title: "How Wondrous and Great" },
    closingPrayer: "Sister Claire Dunn",
  },
];

export function getMeetings(date?: string): SacramentMeeting[] {
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  if (!date) {
    return sorted;
  }
  return sorted.filter((meeting) => meeting.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

/** Most recent Sunday on or before today (local date). */
export function getMostRecentSundayIso(today = new Date()): string {
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const day = date.getDay(); // 0 = Sunday
  date.setDate(date.getDate() - day);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const dayOfMonth = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayOfMonth}`;
}

export function getCurrentSundayMeeting(): SacramentMeeting | undefined {
  const sunday = getMostRecentSundayIso();
  const exact = meetings.find((meeting) => meeting.date === sunday);
  if (exact) {
    return exact;
  }

  // Fallback: nearest meeting on or before that Sunday
  return [...meetings]
    .filter((meeting) => meeting.date <= sunday)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}
