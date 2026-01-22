"use client";

import type {
  TeacherWeeklySchedule,
  SaveTeacherWeeklyScheduleInput,
} from "../teacherSchedule/types";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { toast } from "sonner";
import { SaveTeacherScheduleAction } from "@/app/actions/teacherSchedule";
import SchedulePicker from "../SchedulePicker";

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

  const handleSubmit = async (payload: {
    days: SaveTeacherWeeklyScheduleInput["days"];
  }) => {
    await SaveTeacherScheduleAction({
      teacherId,
      days: payload.days,
    });

    toast.success("Schedule saved!");
    setIsOpen(false);
  };

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
          <SchedulePicker
            teacherWeeklySchedule={teacherWeeklySchedule}
            onSubmit={handleSubmit}
            selectionMode="multi"
          />
        </Modal>
      )}
    </>
  );
};

export default TeacherScheduleAction;
