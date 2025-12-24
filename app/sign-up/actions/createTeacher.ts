"use server";

import { db } from "@/db";
import { teachers } from "@/db/schema";
import { TeacherFormFields } from "./validateForms";

type CreateTeacherInput = {
  clerkUserId: string;
  fields: TeacherFormFields;
};

export async function createTeacherAction({
  clerkUserId,
  fields,
}: CreateTeacherInput) {
  await db.insert(teachers).values({
    clerkUserId,
    email: fields.email,
    fullName: fields.fullName,
    instruments: fields.instruments,
    lessonType: fields.lessonType,
    location: fields.location || null,
    bio: fields.bio,
    experience: fields.experience || null,
    hourlyRate: Number(fields.hourlyRate),
  });
}
