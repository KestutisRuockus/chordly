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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (payload: {
    days: SaveTeacherWeeklyScheduleInput["days"];
  }) => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      await SaveTeacherScheduleAction({
        teacherId,
        days: payload.days,
      });

      toast.success("Schedule saved!");
      setIsOpen(false);
    } catch (err) {
      if (err) {
        console.log("ERR: ", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded border px-3 py-2 w-fit mx-auto h-fit"
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
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </>
  );
};

export default TeacherScheduleAction;
