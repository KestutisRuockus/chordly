import { RoleType } from "@/types/role";

export type LessonStatus = "cancelled" | "scheduled" | "completed";

export type LessonType = "online" | "in-person" | "hybrid";

export type LessonCardProps = {
  currentRole: RoleType;
  lessonDate: string;
  lessonTime: string;
  lessonType: LessonType;
  lessonStatus: LessonStatus;
  participantName: string;
  instrument: string;
  isUpcomingCard?: boolean;
};
