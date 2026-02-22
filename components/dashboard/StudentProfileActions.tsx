"use client";

import { useState } from "react";
import StudentProfileModal from "../ui/StudentProfileModal";

export type ModalMode = "notes" | "new-exercise" | null;

type Props = {
  studentId: string;
  teacherInstrumentsList: string[];
};

const StudentProfileActions = ({
  studentId,
  teacherInstrumentsList,
}: Props) => {
  const [mode, setMode] = useState<ModalMode>(null);
  return (
    <>
      <div className="flex gap-2 w-full my-4">
        <button
          type="button"
          onClick={() => setMode("notes")}
          className="rounded border px-3 w-full bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors duration-300"
        >
          Add notes
        </button>

        <button
          type="button"
          onClick={() => setMode("new-exercise")}
          className="rounded border px-3 w-full bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors duration-300"
        >
          Add new exercise
        </button>
      </div>

      {mode && (
        <StudentProfileModal
          mode={mode}
          onClose={() => setMode(null)}
          studentId={studentId}
          teacherInstrumentsList={teacherInstrumentsList}
        />
      )}
    </>
  );
};

export default StudentProfileActions;
