import { eq, or, ilike, sql, and } from "drizzle-orm";
import { db } from "./index";
import { teachers } from "./schema";

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
