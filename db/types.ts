import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { exercises } from "./schema";

export type ExerciseRow = InferSelectModel<typeof exercises>;
export type NewExercise = InferInsertModel<typeof exercises>;
