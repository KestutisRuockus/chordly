"use client";

import { deleteTeacherNoteAction } from "@/app/actions/teacherNotes";
import type { Note } from "@/app/dashboard/types";
import { Trash2 } from "lucide-react";

type Props = {
  note: Note;
  studentId: string;
};

const Note = ({ note, studentId }: Props) => {
  const handleDelete = async () => {
    await deleteTeacherNoteAction({ noteId: note.id, studentId });
  };

  return (
    <div className="border rounded-lg p-2 min-w-60 max-w-80 text-sm bg-orange-100  pt-4 relative">
      <div className="absolute right-0.5 top-0.5 flex gap-1">
        <Trash2 onClick={handleDelete} className="w-4 h-4 cursor-pointer" />
      </div>
      {note.content}
    </div>
  );
};

export default Note;
