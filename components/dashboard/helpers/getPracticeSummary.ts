import type { WeekDay, Lesson } from "@/app/dashboard/types";
import { ExerciseRow } from "@/db/types";
import { formatDateKey, getMonday, WEEK_DAYS } from "@/lib/date";

export type PracticeSummaryData = {
  lessonsThisWeek: number;
  practiceDaysCount: number;
  practicedDays: WeekDay[];
  completedExercisesThisWeek: number;
  totalExercises: number;
};

export const getPracticeSummary = ({
  lessons,
  exercises,
}: {
  lessons: Lesson[];
  exercises: ExerciseRow[];
}): PracticeSummaryData => {
  const now = new Date();
  const monday = getMonday(now);

  const weekKeySet = new Set(
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return formatDateKey(d);
    }),
  );

  const lessonsThisWeek = lessons.filter((lesson) =>
    weekKeySet.has(lesson.lessonDate),
  ).length;

  const practicedDaysSet = new Set<WeekDay>();

  exercises.forEach((exercise) => {
    exercise.practicedDaysThisWeek.forEach((day) => practicedDaysSet.add(day));
  });

  const completedExercisesThisWeek = exercises.filter(
    (ex) => ex.practicedDaysThisWeek.length >= ex.targetPerWeek,
  ).length;

  const practicedDays = WEEK_DAYS.filter((day) => practicedDaysSet.has(day));
  const practiceDaysCount = practicedDays.length;

  const totalExercises = exercises.length;
  return {
    lessonsThisWeek,
    practiceDaysCount,
    practicedDays,
    completedExercisesThisWeek,
    totalExercises,
  };
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();
