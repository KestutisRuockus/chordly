import { teacherNotes } from "./schema";
import { db } from ".";
import { and, desc, eq } from "drizzle-orm";

export const getTeacherNotes = async (input: {
  teacherId: string;
  studentId: string;
}) => {
  const rows = db
    .select()
    .from(teacherNotes)
    .where(
      and(
        eq(teacherNotes.teacherId, input.teacherId),
        eq(teacherNotes.studentId, input.studentId),
      ),
    )
    .orderBy(desc(teacherNotes.createdAt));

  return rows;
};

export const addTeacherNote = async (input: {
  teacherId: string;
  studentId: string;
  content: string;
}) => {
  await db.insert(teacherNotes).values({
    teacherId: input.teacherId,
    studentId: input.studentId,
    content: input.content,
  });

  return { status: "inserted" as const };
};

export const deleteTeacherNote = async (input: {
  noteId: string;
  teacherId: string;
}) => {
  await db
    .delete(teacherNotes)
    .where(
      and(
        eq(teacherNotes.id, input.noteId),
        eq(teacherNotes.teacherId, input.teacherId),
      ),
    );

  return { status: "deleted" as const };
};
