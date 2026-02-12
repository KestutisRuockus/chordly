import type { TeacherPlan } from "./types";
import type { ValidateCreateUserFields } from "@/app/actions/validateCreateUser";
import { eq, or, ilike, sql, and, inArray } from "drizzle-orm";
import { db } from "./index";
import { teachers } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { cancelAllUpcomingLessons } from "./lesson";
import { addToFormerTeachersIds, removeTeacherFromStudent } from "./students";
import { TeacherEditProfileFields } from "@/app/actions/teacher/validateTeacherProfileAction";

export const createTeacher = async (
  clerkUserId: string,
  fields: ValidateCreateUserFields,
) => {
  await db
    .insert(teachers)
    .values({
      clerkUserId,
      email: fields.email,
      fullName: fields.fullName,
    })
    .onConflictDoUpdate({
      target: teachers.clerkUserId,
      set: {
        fullName: fields.fullName,
        email: fields.email,
      },
    });
};

export const getTeacherDbIdByClerkId = async (clerkUserId: string) => {
  const rows = await db
    .select({ id: teachers.id })
    .from(teachers)
    .where(eq(teachers.clerkUserId, clerkUserId))
    .limit(1);

  const row = rows[0];

  if (!row) {
    throw new Error(`Teacher not found for clerkUserId: ${clerkUserId}`);
  }

  return row.id;
};

export const requireTeacherId = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const teacherId = await getTeacherDbIdByClerkId(userId);

  return teacherId;
};

export const getTeachersSummary = async (limit: number) => {
  return await db
    .select({
      id: teachers.id,
      fullName: teachers.fullName,
      instruments: teachers.instruments,
      lessonType: teachers.lessonType,
    })
    .from(teachers)
    .limit(limit);
};

export const getTeacherById = async (id: string) => {
  const [teacher] = await db.select().from(teachers).where(eq(teachers.id, id));

  return teacher;
};

export const getTeachersSummaryByQuery = async (
  query?: string,
  instruments?: string[],
  limit: number = 5,
) => {
  const conditions = [];

  if (query && query.trim()) {
    conditions.push(ilike(teachers.fullName, `%${query.trim()}%`));
  }

  if (instruments && instruments.length > 0) {
    conditions.push(
      or(
        ...instruments.map(
          (instruments) =>
            sql`${teachers.instruments}::jsonb @> ${JSON.stringify([
              instruments,
            ])}::jsonb`,
        ),
      ),
    );
  }

  return await db
    .select({
      id: teachers.id,
      fullName: teachers.fullName,
      instruments: teachers.instruments,
      lessonType: teachers.lessonType,
    })
    .from(teachers)
    .where(conditions.length ? and(...conditions) : undefined)
    .limit(limit);
};

export const getTeachersSummaryByIds = async (teacherIds: string[]) => {
  if (teacherIds.length === 0) return [];

  return db
    .select({
      id: teachers.id,
      fullName: teachers.fullName,
      instruments: teachers.instruments,
      lessonType: teachers.lessonType,
    })
    .from(teachers)
    .where(inArray(teachers.id, teacherIds));
};

export const getStudentIdsList = async (teacherId: string) => {
  const rows = await db
    .select({ studentsIds: teachers.studentIds })
    .from(teachers)
    .where(eq(teachers.id, teacherId))
    .limit(1);
  return rows[0]?.studentsIds ?? [];
};

export const addStudentToTeacher = async (
  teacherId: string,
  studentId: string,
) => {
  const studentIdsList = await getStudentIdsList(teacherId);

  if (studentIdsList.includes(studentId)) {
    return { status: "already-exists" as const };
  }

  await db
    .update(teachers)
    .set({
      studentIds: [...studentIdsList, studentId],
    })
    .where(eq(teachers.id, teacherId));

  return { status: "updated" as const };
};

export const removeStudentFromTeacher = async (
  teacherId: string,
  studentId: string,
) => {
  const studentIdsList = await getStudentIdsList(teacherId);
  if (!studentIdsList.includes(studentId)) {
    return { status: "student-does-not-exist" as const };
  }

  await db
    .update(teachers)
    .set({
      studentIds: studentIdsList.filter((id) => id !== studentId),
    })
    .where(eq(teachers.id, teacherId));

  return { status: "removed" as const };
};

export const removeFormerStudentFromTeacher = async (
  teacherId: string,
  studentId: string,
) => {
  const formerStudenstIdsList = await getStudentIdsList(teacherId);
  if (formerStudenstIdsList.includes(studentId)) {
    return { status: "student-already-exist" as const };
  }

  await db
    .update(teachers)
    .set({
      formerStudentsIds: formerStudenstIdsList.filter((id) => id !== studentId),
    })
    .where(eq(teachers.id, teacherId));
  return { status: "removed" as const };
};

export const getFormerStudentsIdsList = async (teacherId: string) => {
  const rows = await db
    .select({ formerStudentsIds: teachers.formerStudentsIds })
    .from(teachers)
    .where(eq(teachers.id, teacherId))
    .limit(1);
  return rows[0]?.formerStudentsIds ?? [];
};

export const addToFormerStudentsIds = async (
  teacherId: string,
  studentId: string,
) => {
  const formerStudentIdsList = await getFormerStudentsIdsList(teacherId);

  if (formerStudentIdsList.includes(studentId)) {
    return { status: "already-exists" as const };
  }

  await db
    .update(teachers)
    .set({
      formerStudentsIds: [...formerStudentIdsList, studentId],
    })
    .where(eq(teachers.id, teacherId));

  return { status: "updated" as const };
};

export const getTeacherPlan = async (id: string) => {
  const rows = await db
    .select({
      plan: teachers.plan,
    })
    .from(teachers)
    .where(eq(teachers.id, id))
    .limit(1);

  return rows[0]?.plan ?? "none";
};

export const updateTeacherPlan = async (
  teacherId: string,
  plan: TeacherPlan,
) => {
  const currentPlan = await getTeacherPlan(teacherId);

  if (currentPlan === plan) {
    return "no_change" as const;
  }

  await db.update(teachers).set({ plan }).where(eq(teachers.id, teacherId));
};

export const deactivateStudent = async (
  teacherId: string,
  studentId: string,
) => {
  const studentIds = await getStudentIdsList(teacherId);

  if (!studentIds.includes(studentId)) {
    throw new Error("STUDENT_NOT_FOUND_FOR_TEACHER");
  }

  await cancelAllUpcomingLessons(teacherId, studentId);
  await Promise.all([
    removeStudentFromTeacher(teacherId, studentId),
    removeTeacherFromStudent(studentId, teacherId),
    addToFormerStudentsIds(teacherId, studentId),
    addToFormerTeachersIds(studentId, teacherId),
  ]);

  return { status: "student_deactivated" as const };
};

export const updateTeacherAvatarUrl = async (
  teacherId: string,
  avatarUrl: string | null,
) => {
  await db
    .update(teachers)
    .set({ avatarUrl })
    .where(eq(teachers.id, teacherId));
};

export const updateTeacherProfile = async (
  teacherId: string,
  data: TeacherEditProfileFields,
) => {
  await db
    .update(teachers)
    .set({
      ...data,
      meetingUrl: data.meetingUrl ?? null,
      lessonLocation: data.lessonLocation ?? null,
      avatarUrl: data.avatarUrl ?? null,
    })
    .where(eq(teachers.id, teacherId));

  return { status: "updated" as const };
};

export const getTeacherLessonType = async (teacherId: string) => {
  const rows = await db
    .select({ lessonType: teachers.lessonType })
    .from(teachers)
    .where(eq(teachers.id, teacherId))
    .limit(1);

  return rows[0]?.lessonType ?? "hybrid";
};

export const getTeacherInstrumentsList = async (teacherId: string) => {
  const rows = await db
    .select({ instruments: teachers.instruments })
    .from(teachers)
    .where(eq(teachers.id, teacherId))
    .limit(1);

  return rows[0]?.instruments ?? [];
};
