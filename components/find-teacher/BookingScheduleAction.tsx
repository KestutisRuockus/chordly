"use client";

import type {
  TeacherWeeklySchedule,
  WeekDayNumber,
} from "../teacherSchedule/types";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "../ui/Modal";
import SchedulePicker from "../SchedulePicker";
import { getLessonDateFromWeekday } from "@/lib/date";
import { createLessonAction } from "@/app/actions/lesson";

type Props = {
  buttonLabel: string;
  studentId: string;
  teacherId: string;
  teacherWeeklySchedule: TeacherWeeklySchedule;
};

const BookingScheduleAction = ({
  buttonLabel,
  studentId,
  teacherId,
  teacherWeeklySchedule,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (saved: {
    days: { weekday: WeekDayNumber; hours: number[] }[];
  }) => {
    const selectedDay = saved.days[0];
    const selectedHour = selectedDay?.hours?.[0];

    if (selectedDay == null || selectedHour == null) {
      toast.error("Pick a time slot first");
      return;
    }

    const lessonDate = getLessonDateFromWeekday(selectedDay.weekday);

    await createLessonAction({
      studentId,
      teacherId,
      lessonDate,
      lessonHour: selectedHour,
    });

    toast.success("Lesson booked successfully!");
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
          title="Book a lesson"
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={true}
        >
          <SchedulePicker
            teacherWeeklySchedule={teacherWeeklySchedule}
            onSubmit={handleSubmit}
            selectionMode="single"
          />
        </Modal>
      )}
    </>
  );
};

export default BookingScheduleAction;
