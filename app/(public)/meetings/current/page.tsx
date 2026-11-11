import { redirect } from "next/navigation";
import { getCurrentSundayMeeting } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
  const meeting = await getCurrentSundayMeeting();

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}
