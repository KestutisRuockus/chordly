"use client";

import type { ModalMode } from "../dashboard/StudentProfileActions";
import { useState } from "react";
import NotesForm from "../dashboard/forms/NotesForm";
import ExerciseForm from "../dashboard/forms/ExerciseForm";
import Modal from "@/components/ui/Modal";

type Props = {
  mode: ModalMode;
  onClose: () => void;
  studentId: string;
};

const StudentProfileModal = ({ mode, onClose, studentId }: Props) => {
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
        />
      )}
    </Modal>
  );
};

export default StudentProfileModal;
