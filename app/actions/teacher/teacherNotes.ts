"use server";

import { addTeacherNote, deleteTeacherNote } from "@/db/teacherNotes";
import { requireTeacherId } from "@/db/teachers";
import { revalidatePath } from "next/cache";

export const addTeacherNoteAction = async (input: {
  studentId: string;
  content: string;
}) => {
  const teacherId = await requireTeacherId();

  await addTeacherNote({
    teacherId,
    studentId: input.studentId,
    content: input.content,
  });

  revalidatePath(`/dashboard/teacher/student/${input.studentId}`);
};

export const deleteTeacherNoteAction = async (input: {
  noteId: string;
  studentId: string;
}) => {
  const teacherId = await requireTeacherId();

  await deleteTeacherNote({
    noteId: input.noteId,
    teacherId,
  });

  revalidatePath(`/dashboard/teacher/student/${input.studentId}`);

  return { status: "deleted" as const };
};
