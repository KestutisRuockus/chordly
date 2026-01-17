import { LessonCardProps } from "@/app/dashboard/types";
import { Exercise, WeekDay } from "../ExerciseCard";

type Lesson = Omit<LessonCardProps, "currentRole">;

export type PracticeSummaryData = {
  lessonsThisWeek: number;
  practiceDaysCount: number;
  practicedDays: WeekDay[];
  completedExercisesThisWeek: number;
  totalExercises: number;
};

const weekDays: WeekDay[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getMonday = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const getPracticeSummary = ({
  lessons,
  exercises,
}: {
  lessons: Lesson[];
  exercises: Exercise[];
}): PracticeSummaryData => {
  const now = new Date();
  const monday = getMonday(now);

  const weekKeys = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return formatDateKey(d);
  });
  const weekKeySet = new Set(weekKeys);

  const lessonsThisWeek = lessons.filter((lesson) =>
    weekKeySet.has(lesson.lessonDate)
  ).length;

  const practicedDaysSet = new Set<WeekDay>();

  exercises.forEach((exercise) => {
    exercise.practicedDaysThisWeek.forEach((day) => practicedDaysSet.add(day));
  });

  const completedExercisesThisWeek = exercises.filter(
    (ex) => ex.practicedDaysThisWeek.length >= ex.targetPerWeek
  ).length;

  const practicedDays = weekDays.filter((day) => practicedDaysSet.has(day));
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
