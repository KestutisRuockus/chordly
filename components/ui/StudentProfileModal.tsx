"use client";

import type { ModalMode } from "../dashboard/StudentProfileActions";
import { useState } from "react";
import NotesForm from "../forms/NotesForm";
import ExerciseForm from "../forms/ExerciseForm";
import Modal from "@/components/ui/Modal";

type Props = {
  mode: ModalMode;
  onClose: () => void;
  studentId: string;
  teacherInstrumentsList: string[];
};

const StudentProfileModal = ({
  mode,
  onClose,
  studentId,
  teacherInstrumentsList,
}: Props) => {
  const [formIsEmpty, setFormIsEmpty] = useState(true);

  const title = mode === "notes" ? "Note" : "New Exercise";

  return (
    <Modal title={title} onClose={onClose} closeOnOverlayClick={formIsEmpty}>
      {mode === "notes" ? (
        <NotesForm
          onClose={onClose}
          setFormIsEmpty={setFormIsEmpty}
          studentId={studentId}
        />
      ) : (
        <ExerciseForm
          onClose={onClose}
          setFormIsEmpty={setFormIsEmpty}
          studentId={studentId}
          teacherInstrumentsList={teacherInstrumentsList}
        />
      )}
    </Modal>
  );
};

export default StudentProfileModal;
