import { eq } from "drizzle-orm";
import { db } from ".";
import { students } from "./schema";

export const getStudentDbIdByClerkId = async (clerkUserId: string) => {
  const rows = await db
    .select({ id: students.id })
    .from(students)
    .where(eq(students.clerkUserId, clerkUserId))
    .limit(1);

  const row = rows[0];

  if (!row) {
    throw new Error(`Student not found for clerkUserId: ${clerkUserId}`);
  }

  return row.id;
};
