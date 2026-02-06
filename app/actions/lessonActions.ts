"use server";

import type { LessonStatus, LessonType } from "../dashboard/types";
import {
  updateLessonScheduleAndStatus,
  saveNewLesson,
  findLessonByTeacherDateHour,
  findLessonByStudentDateHour,
  FindLessonByLessonId,
} from "@/db/lesson";
import {
  addTeacherToStudent,
  removeFormerteacherFromStudent,
} from "@/db/students";
import {
  getStudentIdsList,
  getTeacherPlan,
  addStudentToTeacher,
  removeFormerStudentFromTeacher,
} from "@/db/teachers";
import { TEACHER_PLAN_LIMITS } from "@/lib/constants";
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

  const teacherLessonAlreadyExistAtThisTime = await findLessonByTeacherDateHour(
    {
      teacherId,
      lessonDate,
      lessonHour,
    },
  );

  if (teacherLessonAlreadyExistAtThisTime) {
    return { ok: false, error: "TEACHER_SLOT_BOOKED" as const };
  }

  const StudentLessonAlreadyExistAtThisTime = await findLessonByStudentDateHour(
    {
      studentId,
      lessonDate,
      lessonHour,
    },
  );

  if (StudentLessonAlreadyExistAtThisTime) {
    return { ok: false, error: "STUDENT_SLOT_CONFLICT" as const };
  }

  const [teacherPlan, studentIds] = await Promise.all([
    getTeacherPlan(teacherId),
    getStudentIdsList(teacherId),
  ]);

  if (teacherPlan === "none") {
    return { ok: false, error: "TEACHER_PLAN_REQUIRED" as const };
  }

  const alreadyStudent = studentIds.includes(studentId);

  if (!alreadyStudent) {
    const planLimit = TEACHER_PLAN_LIMITS[teacherPlan];
    if (planLimit !== null && studentIds.length >= planLimit) {
      return {
        ok: false,
        error: "TEACHER_STUDENT_LIMIT_REACHED" as const,
      };
    }
  }

  await saveNewLesson({
    studentId,
    teacherId,
    lessonDate,
    lessonHour,
    lessonType,
    lessonStatus,
    instrument,
  });

  await Promise.all([
    addStudentToTeacher(teacherId, studentId),
    addTeacherToStudent(studentId, teacherId),
    removeFormerStudentFromTeacher(teacherId, studentId),
    removeFormerteacherFromStudent(studentId, teacherId),
  ]);

  revalidatePath(`/find-teacher/${input.teacherId}`);

  return { ok: true };
};

export const updateLessonScheduleAndStatusAction = async (input: {
  lessonId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
  lessonStatus?: LessonStatus;
  statusNote: string;
}) => {
  const { lessonId, teacherId, lessonDate, lessonHour, statusNote } = input;
  const newLessonStatus = input.lessonStatus ?? "rescheduled";

  const lesson = await FindLessonByLessonId(lessonId);
  if (!lesson) {
    throw new Error("LESSON_NOT_FOUND");
  }

  if (
    lesson.lessonStatus !== "scheduled" &&
    lesson.lessonStatus !== "rescheduled"
  ) {
    throw new Error("LESSON_NOT_RESCHEDULABLE");
  }

  const teacherLessonAlreadyExistAtThisTime = await findLessonByTeacherDateHour(
    {
      teacherId,
      lessonDate,
      lessonHour,
    },
  );

  if (
    teacherLessonAlreadyExistAtThisTime &&
    teacherLessonAlreadyExistAtThisTime.id !== lessonId
  ) {
    throw new Error("TEACHER_SLOT_BOOKED");
  }

  const studentLessonAlreadyExistAtThisTime = await findLessonByStudentDateHour(
    {
      studentId: lesson.studentId,
      lessonDate,
      lessonHour,
    },
  );

  if (
    studentLessonAlreadyExistAtThisTime &&
    studentLessonAlreadyExistAtThisTime.id !== lessonId
  ) {
    throw new Error("STUDENT_SLOT_CONFLICT");
  }

  await updateLessonScheduleAndStatus({
    lessonId,
    teacherId,
    lessonDate,
    lessonHour,
    lessonStatus: newLessonStatus,
    statusNote,
  });

  revalidatePath(`/find-teacher/${input.teacherId}`);

  return { status: "updated" as const };
};
