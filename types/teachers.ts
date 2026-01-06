import { teachers } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type TeacherFullProfile = InferSelectModel<typeof teachers>;

export type TeacherSummaryCardProps = Pick<
  TeacherFullProfile,
  "id" | "fullName" | "instruments" | "lessonType"
>;
