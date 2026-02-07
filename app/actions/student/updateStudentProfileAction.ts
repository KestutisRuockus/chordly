"use server";

import { auth } from "@clerk/nextjs/server";
import { getStudentDbIdByClerkId } from "@/db/students";
import { updateStudentProfile } from "@/db/students";
import { StudentEditProfileFields } from "./validateStudentProfileAction ";

export const updateStudentProfileAction = async (
  fields: StudentEditProfileFields,
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const studentId = await getStudentDbIdByClerkId(userId);

  await updateStudentProfile(studentId, fields);
};
