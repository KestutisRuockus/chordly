"use client";

import { X } from "lucide-react";
import NotesForm from "../dashboard/forms/NotesForm";
import { useState } from "react";
import ExerciseForm from "../dashboard/forms/ExerciseForm";

export type ModalMode = "notes" | "new-exercise" | null;

type Props = {
  mode: ModalMode;
  onClose: () => void;
};

const ActiveModal = ({ mode, onClose }: Props) => {
  const [formIsEmpty, setFormIsEmpty] = useState(true);

  return (
    <div
      onClick={formIsEmpty ? onClose : undefined}
      className="fixed inset-0 z-50 grid place-items-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-lg bg-white p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {mode === "notes" ? "Note" : "New Exercise"}
          </h2>

          <button
            onClick={onClose}
            className="rounded border px-2 py-1"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4">
          {mode === "notes" ? (
            <NotesForm onClose={onClose} setFormIsEmpty={setFormIsEmpty} />
          ) : (
            <ExerciseForm onClose={onClose} setFormIsEmpty={setFormIsEmpty} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveModal;
