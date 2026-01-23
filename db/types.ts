import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { exercises } from "./schema";
import { lessons } from "@/db/schema";

export type ExerciseRow = InferSelectModel<typeof exercises>;
export type NewExercise = InferInsertModel<typeof exercises>;

export type LessonRow = InferSelectModel<typeof lessons>;
