"use server";

import type { LessonStatus, LessonType } from "../dashboard/types";
import { updateLessonScheduleAndStatus, saveNewLesson } from "@/db/lesson";
import { revalidatePath } from "next/cache";

type CreateLessonInput = {
  studentId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
  instrument: string;
};

export const createLessonAction = async (input: CreateLessonInput) => {
  const lessonType: LessonType = "hybrid";
  const lessonStatus: LessonStatus = "scheduled";

  const { lessonDate, lessonHour, studentId, teacherId, instrument } = input;

  await saveNewLesson({
    studentId,
    teacherId,
    lessonDate,
    lessonHour,
    lessonType,
    lessonStatus,
    instrument,
  });

  revalidatePath(`/find-teacher/${input.teacherId}`);

  return { status: "ok" as const };
};

export const updateLessonScheduleAndStatusAction = async (input: {
  lessonId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
  lessonStatus?: LessonStatus;
}) => {
  const { lessonId, teacherId, lessonDate, lessonHour } = input;
  const newLessonStatus = input.lessonStatus ?? "rescheduled";

  await updateLessonScheduleAndStatus({
    lessonId,
    teacherId,
    lessonDate,
    lessonHour,
    lessonStatus: newLessonStatus,
  });

  revalidatePath(`/find-teacher/${input.teacherId}`);

  return { status: "updated" as const };
};
