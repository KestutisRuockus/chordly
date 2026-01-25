import { LessonStatus } from "@/app/dashboard/types";

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeeklyDaySchedule = {
  weekday: WeekDayNumber;
  hours: number[];
};

export type TeacherWeeklySchedule = {
  teacherId: string;
  days: WeeklyDaySchedule[];
  updatedAt: Date | null;
};

export type TeacherScheduleByTeacherId = Record<string, TeacherWeeklySchedule>;

export type SaveTeacherWeeklyScheduleInput = {
  teacherId: string;
  days: { weekday: number; hours: number[] }[];
};

export const toWeekDayNumber = (n: number): WeekDayNumber => {
  if (n < 0 || n > 6) throw new Error(`Invalid weekday: ${n}`);
  return n as WeekDayNumber;
};

export type CurrentScheduledLesson = {
  currentScheduledLessonLessonId: string;
  currentScheduledLessonDate: string;
  currentScheduledLessonHour: number;
  currentScheduledLessonStatus: LessonStatus;
};
