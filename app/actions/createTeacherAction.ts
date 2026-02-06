"use server";

import { createTeacher } from "@/db/teachers";
import type { TeacherFormFields } from "../sign-up/actions/validateForms";
import { clerkClient } from "@clerk/nextjs/server";

export const createTeacherAction = async (
  clerkUserId: string,
  fields: TeacherFormFields,
) => {
  const client = await clerkClient();
  await client.users.updateUser(clerkUserId, {
    publicMetadata: { role: "teacher" },
  });

  await createTeacher(clerkUserId, fields);
};
