import { LessonStatus, LessonType } from "@/app/dashboard/types";
import { db } from ".";
import { lessons } from "./schema";
import { eq } from "drizzle-orm";
import { RoleType } from "@/types/role";

export const saveNewLesson = async (input: {
  studentId: string;
  teacherId: string;
  lessonDate: string;
  lessonHour: number;
  lessonType: LessonType;
  lessonStatus: LessonStatus;
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
    statusNote: input.statusNote ?? null,
    meetingUrl: input.meetingUrl ?? null,
    location: input.location ?? null,
  });

  return { status: "inserted" as const };
};

export const getAllLessonsByRoleAndId = async (input: {
  role: RoleType;
  id: string;
}) => {
  const column =
    input.role === "student" ? lessons.studentId : lessons.teacherId;
  const rows = await db.select().from(lessons).where(eq(column, input.id));

  return rows;
};
