"use server";

import { deactivateStudent } from "@/db/teachers";
import { revalidatePath } from "next/cache";

export const deactivateStudentAction = async (
  teacherId: string,
  studentId: string,
) => {
  await deactivateStudent(teacherId, studentId);

  revalidatePath("/dashboard/teacher");
  return { status: "student_deactivated" as const };
};
