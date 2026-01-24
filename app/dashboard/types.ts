import { LessonRow } from "@/db/types";
import { RoleType } from "@/types/role";

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
};

export type WeekDay = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export type StudentSummary = {
  id: string;
  name: string;
  instrument: string;
  lessonType: LessonType;
};

export interface StudentProfile extends StudentSummary {
  email: string;
  location: string;
  skillLevel: string;
  bio: string;
  age: number;
}

export type Note = {
  id: string;
  studentId: string;
  teacherId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
};
