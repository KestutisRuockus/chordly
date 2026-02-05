import { students } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type StudentFullProfile = InferSelectModel<typeof students>;
