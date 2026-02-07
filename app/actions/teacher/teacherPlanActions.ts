"use server";

import { updateTeacherPlan } from "@/db/teachers";
import { TeacherPlan } from "@/db/types";
import { revalidatePath } from "next/cache";

export const updateTeacherPlanAction = async (
  teacherId: string,
  plan: TeacherPlan,
) => {
  await updateTeacherPlan(teacherId, plan);

  revalidatePath("/pricing");
  return { status: "updated" as const };
};
