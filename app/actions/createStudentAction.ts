"use server";

import type { StudentFormFields } from "../sign-up/actions/validateForms";
import { clerkClient } from "@clerk/nextjs/server";
import { createStudent } from "@/db/students";

export const createStudentAction = async (
  clerkUserId: string,
  fields: StudentFormFields,
) => {
  const client = await clerkClient();
  await client.users.updateUser(clerkUserId, {
    publicMetadata: { role: "student" },
  });

  await createStudent(clerkUserId, fields);
};
