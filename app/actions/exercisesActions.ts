"use server";

import { ExerciseDifficulty, TargetPerWeek, WeekDay } from "../dashboard/types";
import { createExercise, deleteExercise } from "@/db/exercises";
import { requireTeacherId } from "@/db/teachers";
import { revalidatePath } from "next/cache";

export const createExerciseAction = async (input: {
  studentId: string;
  title: string;
  instrument: string;
  difficulty: ExerciseDifficulty;
  goal: string;
  targetPerWeek: TargetPerWeek;
  practicedDaysThisWeek: WeekDay[];
}) => {
  const teacherId = await requireTeacherId();

  await createExercise({
    teacherId,
    studentId: input.studentId,
    title: input.title,
    instrument: input.instrument,
    difficulty: input.difficulty,
    goal: input.goal,
    targetPerWeek: input.targetPerWeek,
    practicedDaysThisWeek: input.practicedDaysThisWeek ?? [],
  });

  revalidatePath(`/dashboard/teacher/student/${input.studentId}`);
};

export const deleteExerciseAction = async (input: {
  exerciseId: string;
  studentId: string;
}) => {
  const teacherId = await requireTeacherId();

  await deleteExercise({
    exerciseId: input.exerciseId,
    teacherId,
    studentId: input.studentId,
  });

  revalidatePath(`/dashboard/teacher/student/${input.studentId}`);

  return { status: "deleted" as const };
};
