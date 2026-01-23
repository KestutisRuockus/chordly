"use server";

import { saveNewLesson } from "@/db/lesson";
import { LessonStatus, LessonType } from "../dashboard/types";
import { revalidatePath } from "next/cache";

type CreateLessonInput = {
  studentId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
};

export const createLessonAction = async (input: CreateLessonInput) => {
  const lessonType: LessonType = "hybrid";
  const lessonStatus: LessonStatus = "scheduled";

  const { lessonDate, lessonHour, studentId, teacherId } = input;

  await saveNewLesson({
    studentId,
    teacherId,
    lessonDate,
    lessonHour,
    lessonType,
    lessonStatus,
  });

  revalidatePath(`/find-teacher/${input.teacherId}`);

  return { status: "ok" as const };
};
