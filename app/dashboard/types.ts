import { RoleType } from "@/types/role";

export type LessonStatus = "cancelled" | "scheduled" | "completed";

export type LessonType = "online" | "in-person" | "hybrid";

export type TargetPerWeek = 1 | 3 | 5;

export type Lesson = {
  id: string;
  lessonDate: string;
  lessonTime: string;
  lessonType: LessonType;
  lessonStatus: LessonStatus;
  participantName: string;
  instrument: string;
  studentId: string;
  teacherId: string;
};

export type LessonCardProps = Lesson & {
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
