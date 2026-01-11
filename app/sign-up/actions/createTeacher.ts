"use server";

import { db } from "@/db";
import { teachers } from "@/db/schema";
import { TeacherFormFields } from "./validateForms";
import { clerkClient } from "@clerk/nextjs/server";

type CreateTeacherInput = {
  clerkUserId: string;
  fields: TeacherFormFields;
};

export async function createTeacherAction({
  clerkUserId,
  fields,
}: CreateTeacherInput) {
  const client = await clerkClient();
  await client.users.updateUser(clerkUserId, {
    publicMetadata: {
      role: "teacher",
    },
  });
  await db
    .insert(teachers)
    .values({
      clerkUserId,
      email: fields.email,
      fullName: fields.fullName,
      instruments: fields.instruments,
      lessonType: fields.lessonType,
      location: fields.location || null,
      bio: fields.bio,
      experience: fields.experience || null,
      hourlyRate: Number(fields.hourlyRate),
    })
    .onConflictDoUpdate({
      target: teachers.email,
      set: {
        fullName: fields.fullName,
        instruments: fields.instruments,
        lessonType: fields.lessonType,
        location: fields.location || null,
        bio: fields.bio,
        experience: fields.experience || null,
        hourlyRate: Number(fields.hourlyRate),
        clerkUserId,
      },
    });
}
