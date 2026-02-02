import type { TeacherWeeklySchedule } from "@/components/teacherSchedule/types";
import type { LessonRow } from "@/db/types";
import type { RoleType } from "@/types/role";

export type LessonStatus =
  | "cancelled"
  | "scheduled"
  | "completed"
  | "rescheduled";

export type LessonType = "online" | "in-person" | "hybrid";

export type TargetPerWeek = 1 | 3 | 5;

export type LessonWithParticipant = LessonRow & {
  participantName?: string;
};

export type LessonCardProps = LessonWithParticipant & {
  currentRole: RoleType;
  isUpcomingCard?: boolean;
  teacherWeeklySchedule: TeacherWeeklySchedule;
  teacherBookedSlots?: LessonRow[];
};

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export type Note = {
  id: string;
  studentId: string;
  teacherId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};
