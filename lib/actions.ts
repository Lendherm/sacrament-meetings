"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  addMeeting,
  deleteMeeting as deleteMeetingFromDb,
  updateMeetingRecord,
} from "@/lib/meetings-db";
import type { MeetingInput } from "@/lib/meetings-db";
import type { MeetingType, SpeakerItem, WardBusinessItem } from "@/lib/types";

async function requireBishopricSession() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  return session;
}

const MeetingFormSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD."),
  meetingType: z.enum(["testimony", "regular", "stake", "general", "special"], {
    error: "Select a valid meeting type.",
  }),
  presiding: z.string().trim().min(2, "Presiding must be at least 2 characters."),
  conducting: z
    .string()
    .trim()
    .min(2, "Conducting must be at least 2 characters."),
  announcements: z.string().optional(),
  openingHymnNumber: z.coerce
    .number()
    .int()
    .min(1, "Opening hymn number is required."),
  openingHymnTitle: z
    .string()
    .trim()
    .min(2, "Opening hymn title is required."),
  openingPrayer: z
    .string()
    .trim()
    .min(2, "Opening prayer must be at least 2 characters."),
  wardBusiness: z.string().optional(),
  stakeBusiness: z.string().optional(),
  sacramentHymnNumber: z.coerce
    .number()
    .int()
    .min(1, "Sacrament hymn number is required."),
  sacramentHymnTitle: z
    .string()
    .trim()
    .min(2, "Sacrament hymn title is required."),
  speakers: z.string().optional(),
  closingHymnNumber: z.coerce
    .number()
    .int()
    .min(1, "Closing hymn number is required."),
  closingHymnTitle: z
    .string()
    .trim()
    .min(2, "Closing hymn title is required."),
  closingPrayer: z
    .string()
    .trim()
    .min(2, "Closing prayer must be at least 2 characters."),
});

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    speakers?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

function linesToList(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseWardBusiness(value: string | undefined): WardBusinessItem[] {
  return linesToList(value).map((description) => ({ description }));
}

function parseSpeakers(value: string | undefined): SpeakerItem[] {
  if (!value?.trim()) return [];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = "", topic = "", type = "speaker"] = line
        .split("|")
        .map((part) => part.trim());
      return {
        name,
        topic,
        type: type === "musical-number" ? "musical-number" : "speaker",
      } satisfies SpeakerItem;
    })
    .filter((speaker) => speaker.name.length > 0);
}

function toMeetingInput(
  data: z.infer<typeof MeetingFormSchema>
): MeetingInput {
  return {
    date: data.date,
    meetingType: data.meetingType as MeetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: linesToList(data.announcements),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: parseWardBusiness(data.wardBusiness),
    stakeBusiness: data.stakeBusiness === "on" || data.stakeBusiness === "true",
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers: parseSpeakers(data.speakers),
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

function readForm(formData: FormData) {
  return MeetingFormSchema.safeParse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    announcements: formData.get("announcements") ?? "",
    openingHymnNumber: formData.get("openingHymnNumber"),
    openingHymnTitle: formData.get("openingHymnTitle"),
    openingPrayer: formData.get("openingPrayer"),
    wardBusiness: formData.get("wardBusiness") ?? "",
    stakeBusiness: formData.get("stakeBusiness") ?? "",
    sacramentHymnNumber: formData.get("sacramentHymnNumber"),
    sacramentHymnTitle: formData.get("sacramentHymnTitle"),
    speakers: formData.get("speakers") ?? "",
    closingHymnNumber: formData.get("closingHymnNumber"),
    closingHymnTitle: formData.get("closingHymnTitle"),
    closingPrayer: formData.get("closingPrayer"),
  });
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  void prevState;
  await requireBishopricSession();
  const validated = readForm(formData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to create meeting.",
    };
  }

  try {
    await addMeeting(toMeetingInput(validated.data));
  } catch (error) {
    console.error("createMeeting failed:", error);
    throw new Error("Database Error: Failed to create meeting.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  void prevState;
  await requireBishopricSession();
  const meetingId = Number(id);
  if (!Number.isInteger(meetingId) || meetingId < 1) {
    return { message: "Invalid meeting id." };
  }

  const validated = readForm(formData);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update meeting.",
    };
  }

  try {
    const updated = await updateMeetingRecord(
      meetingId,
      toMeetingInput(validated.data)
    );
    if (!updated) {
      return { message: "Meeting not found." };
    }
  } catch (error) {
    console.error("updateMeeting failed:", error);
    throw new Error("Database Error: Failed to update meeting.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${meetingId}`);
  redirect("/meetings");
}

export async function deleteMeeting(id: string) {
  await requireBishopricSession();
  const meetingId = Number(id);
  if (!Number.isInteger(meetingId) || meetingId < 1) {
    throw new Error("Invalid meeting id.");
  }

  try {
    const deleted = await deleteMeetingFromDb(meetingId);
    if (!deleted) {
      throw new Error("Meeting not found.");
    }
  } catch (error) {
    console.error("deleteMeeting failed:", error);
    throw new Error("Database Error: Failed to delete meeting.");
  }

  revalidatePath("/meetings");
}
