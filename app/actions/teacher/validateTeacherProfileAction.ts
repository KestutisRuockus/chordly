"use server";

import { LessonType } from "@/app/dashboard/types";

export type TeacherEditProfileFields = {
  instruments: string[];
  lessonType: LessonType;
  location: string;
  bio: string;
  experience: string;
  hourlyRate: number;
  meetingUrl?: string;
  lessonLocation?: string;
  avatarUrl?: string;
};

export type TeacherProfileState = {
  error?: string;
  success?: boolean;
  fields?: TeacherEditProfileFields;
};

export const validateTeacherProfileAction = async (
  _: TeacherProfileState,
  formData: FormData,
): Promise<TeacherProfileState> => {
  const instruments = formData.getAll("instruments") as string[];
  const hourlyRateValue = formData.get("hourlyRate") as string;

  const fields: TeacherEditProfileFields = {
    instruments,
    lessonType: (
      (formData.get("lessonType") as string) || ""
    ).trim() as LessonType,
    location: ((formData.get("location") as string) || "").trim(),
    bio: ((formData.get("bio") as string) || "").trim(),
    experience: ((formData.get("experience") as string) || "").trim(),
    hourlyRate:
      hourlyRateValue && hourlyRateValue.trim() !== ""
        ? Number(hourlyRateValue)
        : 0,
    meetingUrl:
      ((formData.get("meetingUrl") as string) || "").trim() || undefined,
    lessonLocation:
      ((formData.get("lessonLocation") as string) || "").trim() || undefined,
    avatarUrl: (formData.get("avatarUrl") as string) || undefined,
  };

  if (!fields.instruments.length) {
    return { error: "Select at least one instrument.", fields };
  }

  if (!fields.experience) {
    return { error: "Experience is required.", fields };
  }

  if (!fields.lessonType) {
    return { error: "Lesson type is required.", fields };
  }

  if (!fields.hourlyRate || fields.hourlyRate <= 0) {
    return { error: "Hourly rate must be greater than 0.", fields };
  }

  if (!fields.bio || fields.bio.length < 10) {
    return { error: "Bio must be at least 10 characters.", fields };
  }

  if (!fields.location || fields.location.length < 2) {
    return { error: "Location is required.", fields };
  }

  if (
    (fields.lessonType === "online" || fields.lessonType === "hybrid") &&
    !fields.meetingUrl
  ) {
    return {
      error: "Meeting URL is required for online/hybrid lessons.",
      fields,
    };
  }

  if (
    (fields.lessonType === "in-person" || fields.lessonType === "hybrid") &&
    !fields.lessonLocation
  ) {
    return {
      error: "Lesson location is required for in-person/hybrid lessons.",
      fields,
    };
  }

  return { success: true, fields };
};
