"use client";

import { useState } from "react";
import type { ModalMode } from "../ui/ActiveModal";
import ActiveModal from "../ui/ActiveModal";

const StudentProfileActions = () => {
  const [mode, setMode] = useState<ModalMode>(null);
  return (
    <>
      <div className="flex gap-2 w-full my-4">
        <button
          type="button"
          onClick={() => setMode("notes")}
          className="rounded border px-3 w-full"
        >
          Add notes
        </button>

        <button
          type="button"
          onClick={() => setMode("new-exercise")}
          className="rounded border px-3 w-full"
        >
          Add new exercise
        </button>
      </div>

      {mode && <ActiveModal mode={mode} onClose={() => setMode(null)} />}
    </>
  );
};

export default StudentProfileActions;
