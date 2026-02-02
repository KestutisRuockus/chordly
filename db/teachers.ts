import { eq, or, ilike, sql, and } from "drizzle-orm";
import { db } from "./index";
import { teachers } from "./schema";
import { auth } from "@clerk/nextjs/server";

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

export async function getTeachersSummary(limit: number) {
  return await db
    .select({
      id: teachers.id,
      fullName: teachers.fullName,
      instruments: teachers.instruments,
      lessonType: teachers.lessonType,
    })
    .from(teachers)
    .limit(limit);
}

export async function getTeacherById(id: string) {
  const [teacher] = await db.select().from(teachers).where(eq(teachers.id, id));

  return teacher;
}

export async function getTeachersSummaryByQuery(
  query?: string,
  instruments?: string[],
  limit: number = 5,
) {
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
}

export const getStudentIdsList = async (teacherId: string) => {
  const rows = await db
    .select({ studentsIds: teachers.studentIds })
    .from(teachers)
    .where(eq(teachers.id, teacherId))
    .limit(1);
  return rows[0]?.studentsIds ?? [];
};

export const updateStudentIdsList = async (
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
