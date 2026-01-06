import { eq } from "drizzle-orm";
import { db } from "./index";
import { teachers } from "./schema";

export async function getTeachersSummary() {
  return await db
    .select({
      id: teachers.id,
      fullName: teachers.fullName,
      instruments: teachers.instruments,
      lessonType: teachers.lessonType,
    })
    .from(teachers);
}

export async function getTeacherById(id: string) {
  const [teacher] = await db.select().from(teachers).where(eq(teachers.id, id));

  return teacher;
}
