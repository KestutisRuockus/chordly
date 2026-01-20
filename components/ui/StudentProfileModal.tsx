"use client";

import type { ModalMode } from "../dashboard/StudentProfileActions";
import { useState } from "react";
import NotesForm from "../dashboard/forms/NotesForm";
import ExerciseForm from "../dashboard/forms/ExerciseForm";
import Modal from "@/components/ui/Modal";

type Props = {
  mode: ModalMode;
  onClose: () => void;
};

const StudentProfileModal = ({ mode, onClose }: Props) => {
  const [formIsEmpty, setFormIsEmpty] = useState(true);

  const title = mode === "notes" ? "Note" : "New Exercise";

  return (
    <Modal title={title} onClose={onClose} closeOnOverlayClick={formIsEmpty}>
      {mode === "notes" ? (
        <NotesForm onClose={onClose} setFormIsEmpty={setFormIsEmpty} />
      ) : (
        <ExerciseForm onClose={onClose} setFormIsEmpty={setFormIsEmpty} />
      )}
    </Modal>
  );
};

export default StudentProfileModal;
