import { RoleType } from "@/types/role";

export type LessonStatus = "cancelled" | "scheduled" | "completed";

export type LessonType = "online" | "in-person" | "hybrid";

export type Lesson = {
  id: string;
  lessonDate: string;
  lessonTime: string;
  lessonType: LessonType;
  lessonStatus: LessonStatus;
  participantName: string;
  instrument: string;
};

export type LessonCardProps = Lesson & {
  currentRole: RoleType;
  isUpcomingCard?: boolean;
};

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export type Exercise = {
  id: string;
  title: string;
  instrument: string;
  difficulty: ExerciseDifficulty;
  goal: string;
  targetPerWeek: 1 | 3 | 5;
  practicedDaysThisWeek: WeekDay[];
};

export type StudentSummary = {
  id: string;
  name: string;
  instrument: string;
  lessonType: LessonType;
};
