"use client";

import type { TeacherWeeklySchedule } from "../teacherSchedule/types";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import TeacherScheduleForm from "../teacherSchedule/TeacherScheduleForm";

type Props = {
  buttonLabel: string;
  teacherId: string;
  teacherWeeklySchedule: TeacherWeeklySchedule;
};

const TeacherScheduleAction = ({
  buttonLabel,
  teacherId,
  teacherWeeklySchedule,
}: Props) => {
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
          <TeacherScheduleForm
            teacherId={teacherId}
            onClose={() => setIsOpen(false)}
            teacherWeeklySchedule={teacherWeeklySchedule}
          />
        </Modal>
      )}
    </>
  );
};

export default TeacherScheduleAction;
