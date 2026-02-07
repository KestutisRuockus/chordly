"use server";

import { auth } from "@clerk/nextjs/server";
import { TeacherEditProfileFields } from "./validateTeacherProfileAction";
import { getTeacherDbIdByClerkId, updateTeacherProfile } from "@/db/teachers";

export const updateTeacherProfileAction = async (
  fields: TeacherEditProfileFields,
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const teacherId = await getTeacherDbIdByClerkId(userId);

  await updateTeacherProfile(teacherId, fields);
};
