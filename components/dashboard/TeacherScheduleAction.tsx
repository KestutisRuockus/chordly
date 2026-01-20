"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import TeacherScheduleForm from "../teacherSchedule/TeacherScheduleForm";

type Props = {
  buttonLabel: string;
};

const TeacherScheduleAction = ({ buttonLabel }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded border px-3 py-2 w-fit mx-auto"
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <Modal
          title="Weekly availability (applies every week)"
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={true}
        >
          <TeacherScheduleForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default TeacherScheduleAction;
