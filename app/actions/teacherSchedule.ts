"use server";

import type { SaveTeacherWeeklyScheduleInput } from "@/components/teacherSchedule/types";
import { saveTeacherWeeklySchedule } from "@/db/teacherSchedule";
import { revalidatePath } from "next/cache";

export const SaveTeacherScheduleAction = async (
  input: SaveTeacherWeeklyScheduleInput,
) => {
  await saveTeacherWeeklySchedule(input);

  revalidatePath("/dashboard");
};
