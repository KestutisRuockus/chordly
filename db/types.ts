import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { exercises, students } from "./schema";
import { lessons } from "@/db/schema";
import { getStudentSummaries } from "./students";

export type ExerciseRow = InferSelectModel<typeof exercises>;
export type NewExercise = InferInsertModel<typeof exercises>;

export type LessonRow = InferSelectModel<typeof lessons>;

export type StudentSummary = Awaited<
  ReturnType<typeof getStudentSummaries>
>[number];
export type StudentRow = InferSelectModel<typeof students>;

export type TeacherPlan = "none" | "basic" | "medium" | "pro";
