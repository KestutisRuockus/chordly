"use server";

import type { ValidateCreateUserFields } from "../validateCreateUser";
import { clerkClient } from "@clerk/nextjs/server";
import { createStudent } from "@/db/students";

export const createStudentAction = async (
  clerkUserId: string,
  fields: ValidateCreateUserFields,
) => {
  const client = await clerkClient();
  await client.users.updateUser(clerkUserId, {
    publicMetadata: { role: "student" },
  });

  await createStudent(clerkUserId, fields);
};
