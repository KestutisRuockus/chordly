"use server";

import { getTeacherLessonType } from "@/db/teachers";

export const getTeacherLessonTypeAction = async (teacherId: string) => {
  return await getTeacherLessonType(teacherId);
};
