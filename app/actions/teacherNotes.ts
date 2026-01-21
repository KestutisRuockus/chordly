"use server";

import { addTeacherNote, deleteTeacherNote } from "@/db/teacherNotes";
import { getTeacherDbIdByClerkId } from "@/db/teachers";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const AddTeacherNoteAction = async (input: {
  studentId: string;
  content: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const teacherId = await getTeacherDbIdByClerkId(userId);

  await addTeacherNote({
    teacherId,
    studentId: input.studentId,
    content: input.content,
  });

  revalidatePath(`/dashboard/teacher/student/${input.studentId}`);
};

export const DeleteTeacherNoteAction = async (input: {
  noteId: string;
  studentId: string;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const teacherId = await getTeacherDbIdByClerkId(userId);

  await deleteTeacherNote({
    noteId: input.noteId,
    teacherId,
  });

  revalidatePath(`/dashboard/teacher/student/${input.studentId}`);

  return { status: "deleted" as const };
};
