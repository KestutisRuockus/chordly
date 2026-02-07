"use client";

import { addTeacherNoteAction } from "@/app/actions/teacher/teacherNotes";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
  setFormIsEmpty: Dispatch<SetStateAction<boolean>>;
  studentId: string;
};

const NotesForm = ({ onClose, setFormIsEmpty, studentId }: Props) => {
  const [note, setNote] = useState("");
  const [errMsg, setErrmsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() === "") {
      setErrmsg("Text area cannot be empty.");
      toast.error("Text area cannot be empty.");
      return;
    }

    await addTeacherNoteAction({
      studentId,
      content: note.trim(),
    });

    toast.success("Note saved!");
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNote(value);
    const isEmpty = value.trim() === "";
    setFormIsEmpty(isEmpty);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={note}
        onChange={handleChange}
        className="border rounded-lg p-2"
        rows={5}
        placeholder="Write note..."
      />
      {errMsg && <p className="text-sm text-red-500">{errMsg}</p>}
      <button type="submit" className="rounded border px-3 py-2">
        Save
      </button>
    </form>
  );
};

export default NotesForm;
