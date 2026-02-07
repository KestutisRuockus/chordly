"use server";

import { createTeacher } from "@/db/teachers";
import { clerkClient } from "@clerk/nextjs/server";
import { ValidateCreateUserFields } from "../validateCreateUser";

export const createTeacherAction = async (
  clerkUserId: string,
  fields: ValidateCreateUserFields,
) => {
  const client = await clerkClient();
  await client.users.updateUser(clerkUserId, {
    publicMetadata: { role: "teacher" },
  });

  await createTeacher(clerkUserId, fields);
};
