import type {
  ExerciseDifficulty,
  TargetPerWeek,
  WeekDay,
} from "@/app/dashboard/types";
import { exercises } from "./schema";
import { db } from ".";
import { and, desc, eq } from "drizzle-orm";

export const getExercisesByTeacherAndStudent = async (input: {
  teacherId: string;
  studentId: string;
}) => {
  const rows = await db
    .select()
    .from(exercises)
    .where(
      and(
        eq(exercises.teacherId, input.teacherId),
        eq(exercises.studentId, input.studentId),
      ),
    )
    .orderBy(desc(exercises.createdAt));

  return rows;
};

export const getExercisesByStudentId = async (studentId: string) => {
  const rows = await db
    .select()
    .from(exercises)
    .where(eq(exercises.studentId, studentId))
    .orderBy(desc(exercises.createdAt));

  return rows;
};

export const createExercise = async (input: {
  teacherId: string;
  studentId: string;
  title: string;
  instrument: string;
  difficulty: ExerciseDifficulty;
  goal: string;
  targetPerWeek: TargetPerWeek;
  practicedDaysThisWeek: WeekDay[];
}) => {
  await db.insert(exercises).values({
    teacherId: input.teacherId,
    studentId: input.studentId,
    title: input.title,
    instrument: input.instrument,
    difficulty: input.difficulty,
    goal: input.goal,
    targetPerWeek: input.targetPerWeek,
    practicedDaysThisWeek: input.practicedDaysThisWeek ?? [],
  });

  return { status: "inserted" as const };
};

export const deleteExercise = async (input: {
  exerciseId: string;
  teacherId: string;
  studentId: string;
}) => {
  await db
    .delete(exercises)
    .where(
      and(
        eq(exercises.id, input.exerciseId),
        eq(exercises.teacherId, input.teacherId),
        eq(exercises.studentId, input.studentId),
      ),
    );

  return { status: "deleted" };
};

export const markExercisePracticedToday = async (input: {
  studentId: string;
  exerciseId: string;
  today: WeekDay;
}) => {
  const rows = await db
    .select({ practicedDaysThisWeek: exercises.practicedDaysThisWeek })
    .from(exercises)
    .where(
      and(
        eq(exercises.id, input.exerciseId),
        eq(exercises.studentId, input.studentId),
      ),
    )
    .limit(1);

  const exercise = rows[0];

  if (!exercise) {
    throw new Error("Exercise not found");
  }

  const practicedDays = exercise.practicedDaysThisWeek ?? [];

  const updatedDays = [...practicedDays, input.today];

  await db
    .update(exercises)
    .set({
      practicedDaysThisWeek: updatedDays,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(exercises.id, input.exerciseId),
        eq(exercises.studentId, input.studentId),
      ),
    );

  return { status: "updated" as const };
};
