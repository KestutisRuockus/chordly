import type {
  SaveTeacherWeeklyScheduleInput,
  TeacherWeeklySchedule,
} from "@/components/teacherSchedule/types";
import { toWeekDayNumber } from "@/components/teacherSchedule/types";
import { eq } from "drizzle-orm";
import { db } from ".";
import { teacherAvailability } from "./schema";

export const saveTeacherWeeklySchedule = async ({
  teacherId,
  days,
}: SaveTeacherWeeklyScheduleInput) => {
  const existing = await db
    .select({ teacherId: teacherAvailability.teacherId })
    .from(teacherAvailability)
    .where(eq(teacherAvailability.teacherId, teacherId))
    .limit(1);

  const exists = existing.length > 0;

  if (!exists) {
    await db.insert(teacherAvailability).values({
      teacherId,
      days,
    });
    return { status: "inserted" as const };
  }

  await db
    .update(teacherAvailability)
    .set({
      days,
      updatedAt: new Date(),
    })
    .where(eq(teacherAvailability.teacherId, teacherId));

  return { status: "updated" as const };
};

export const getTeacherWeeklySchedule = async (
  teacherId: string,
): Promise<TeacherWeeklySchedule> => {
  const rows = await db
    .select({
      teacherId: teacherAvailability.teacherId,
      days: teacherAvailability.days,
      updatedAt: teacherAvailability.updatedAt,
    })
    .from(teacherAvailability)
    .where(eq(teacherAvailability.teacherId, teacherId))
    .limit(1);

  const row = rows[0];

  if (!row) {
    return { teacherId, days: [], updatedAt: null };
  }

  const rawDays = row.days as Array<{ weekday: number; hours: number[] }>;

  return {
    teacherId: row.teacherId,
    days: rawDays.map((d) => ({
      weekday: toWeekDayNumber(d.weekday),
      hours: d.hours,
    })),
    updatedAt: row.updatedAt ?? null,
  };
};
