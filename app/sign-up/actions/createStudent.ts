"use server";

import { db } from "@/db";
import { StudentFormFields } from "./validateForms";
import { students } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";

type CreateStudentInput = {
  clerkUserId: string;
  fields: StudentFormFields;
};

export async function createStudent({
  clerkUserId,
  fields,
}: CreateStudentInput) {
  const client = await clerkClient();
  await client.users.updateUser(clerkUserId, {
    publicMetadata: {
      role: "student",
    },
  });
  await db
    .insert(students)
    .values({
      clerkUserId,
      fullName: fields.fullName,
      email: fields.email,
      lessonType: fields.lessonType,
      location: fields.location,
      skillLevel: fields.skillLevel,
      bio: fields.bio,
      age: fields.age,
    })
    .onConflictDoUpdate({
      target: students.email,
      set: {
        clerkUserId,
        fullName: fields.fullName,
        lessonType: fields.lessonType,
        location: fields.location,
        skillLevel: fields.skillLevel,
        bio: fields.bio,
        age: fields.age,
      },
    });
}
