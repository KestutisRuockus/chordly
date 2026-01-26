import { LessonStatus, LessonType } from "@/app/dashboard/types";
import { db } from ".";
import { lessons, students, teachers } from "./schema";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import { RoleType } from "@/types/role";

export const saveNewLesson = async (input: {
  studentId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
  lessonType: LessonType;
  lessonStatus: LessonStatus;
  instrument: string;
  statusNote?: string | null;
  meetingUrl?: string | null;
  location?: string | null;
}) => {
  await db.insert(lessons).values({
    studentId: input.studentId,
    teacherId: input.teacherId,
    lessonDate: input.lessonDate,
    lessonHour: input.lessonHour,
    lessonType: input.lessonType,
    lessonStatus: input.lessonStatus,
    instrument: input.instrument,
    statusNote: input.statusNote ?? null,
    meetingUrl: input.meetingUrl ?? null,
    location: input.location ?? null,
  });

  return { status: "inserted" as const };
};

export const getAllLessonsByRoleAndId = async (input: {
  role: RoleType;
  id: string;
  fromDate: string;
  toDate: string;
}) => {
  const dateRangeFilter = and(
    gte(lessons.lessonDate, input.fromDate),
    lte(lessons.lessonDate, input.toDate),
  );

  if (input.role === "student") {
    const rows = await db
      .select({
        lesson: lessons,
        participantName: teachers.fullName,
      })
      .from(lessons)
      .innerJoin(teachers, eq(teachers.id, lessons.teacherId))
      .where(and(eq(lessons.studentId, input.id), dateRangeFilter))
      .orderBy(desc(lessons.lessonDate));

    return rows.map((row) => ({
      ...row.lesson,
      participantName: row.participantName,
    }));
  }

  const rows = await db
    .select({
      lesson: lessons,
      participantName: students.fullName,
    })
    .from(lessons)
    .innerJoin(students, eq(students.id, lessons.studentId))
    .where(and(eq(lessons.teacherId, input.id), dateRangeFilter))
    .orderBy(desc(lessons.lessonDate));

  return rows.map((row) => ({
    ...row.lesson,
    participantName: row.participantName,
  }));
};

export const updateLessonScheduleAndStatus = async ({
  lessonId,
  teacherId,
  lessonDate,
  lessonHour,
  lessonStatus,
  statusNote,
}: {
  lessonId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
  lessonStatus: LessonStatus;
  statusNote: string;
}) => {
  await db
    .update(lessons)
    .set({
      lessonDate,
      lessonHour,
      lessonStatus,
      statusNote,
      updatedAt: new Date(),
    })
    .where(and(eq(lessons.id, lessonId), eq(lessons.teacherId, teacherId)));

  return { status: "updated" as const };
};
