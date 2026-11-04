import { redirect } from "next/navigation";
import { getCurrentSundayMeeting } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default function CurrentMeetingPage() {
  const meeting = getCurrentSundayMeeting();

  if (!meeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${meeting.id}`);
}
