import { eq, inArray } from "drizzle-orm";
import { db } from ".";
import { students } from "./schema";
import { auth } from "@clerk/nextjs/server";

export const getStudentDbIdByClerkId = async (clerkUserId: string) => {
  const rows = await db
    .select({ id: students.id })
    .from(students)
    .where(eq(students.clerkUserId, clerkUserId))
    .limit(1);

  const row = rows[0];

  if (!row) {
    throw new Error(`Student not found for clerkUserId: ${clerkUserId}`);
  }

  return row.id;
};

export const requireStudentId = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const studentId = await getStudentDbIdByClerkId(userId);

  return studentId;
};

export const getTeacherIdsList = async (studentId: string) => {
  const rows = await db
    .select({ teacherIds: students.teacherIds })
    .from(students)
    .where(eq(students.id, studentId))
    .limit(1);

  return rows[0]?.teacherIds ?? [];
};

export const updateTeacherIdsList = async (
  studentId: string,
  teacherId: string,
) => {
  const teacherIdsList = await getTeacherIdsList(studentId);

  if (teacherIdsList.includes(teacherId)) {
    return { status: "already-exist" as const };
  }

  await db
    .update(students)
    .set({ teacherIds: [...teacherIdsList, teacherId] })
    .where(eq(students.id, studentId));

  return { status: "updated" as const };
};

export const getStudentSummaries = async (studentIds: string[]) => {
  if (studentIds.length === 0) {
    return [];
  }

  return await db
    .select({
      id: students.id,
      name: students.fullName,
      lessonType: students.lessonType,
    })
    .from(students)
    .where(inArray(students.id, studentIds));
};

export const getStudentById = async (id: string) => {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.id, id))
    .limit(1);

  return student;
};
