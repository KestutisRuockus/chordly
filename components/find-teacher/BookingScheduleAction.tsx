"use client";

import type {
  CurrentScheduledLesson,
  TeacherWeeklySchedule,
  WeekDayNumber,
} from "../teacherSchedule/types";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "../ui/Modal";
import SchedulePicker from "../SchedulePicker";
import {
  getLessonDateFromWeekday,
  isLessonFinished,
  isLessonInPast,
} from "@/lib/date";
import {
  createLessonAction,
  updateLessonScheduleAndStatusAction,
} from "@/app/actions/lesson";
import { RoleType } from "@/types/role";

type Props = {
  buttonLabel: string;
  studentId: string;
  teacherId: string;
  teacherWeeklySchedule: TeacherWeeklySchedule;
  teacherInstruments: string[];
  currentScheduledLesson?: CurrentScheduledLesson;
  currentRole?: RoleType;
};

const BookingScheduleAction = ({
  buttonLabel,
  studentId,
  teacherId,
  teacherWeeklySchedule,
  teacherInstruments,
  currentScheduledLesson,
  currentRole,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [instrument, setInstrument] = useState("");

  const isDisabled =
    currentScheduledLesson &&
    isLessonInPast(
      currentScheduledLesson.currentScheduledLessonDate,
      currentScheduledLesson.currentScheduledLessonHour,
    );
  const isTeacher = currentRole === "teacher";
  const isCompletable =
    isTeacher &&
    currentScheduledLesson &&
    currentScheduledLesson.currentScheduledLessonStatus !== "cancelled" &&
    isLessonFinished(
      currentScheduledLesson?.currentScheduledLessonDate,
      currentScheduledLesson?.currentScheduledLessonHour,
    );
  const isCompleted =
    currentScheduledLesson?.currentScheduledLessonStatus === "completed";

  const handleSubmit = async (saved: {
    days: { weekday: WeekDayNumber; hours: number[] }[];
    statusNote?: string;
  }) => {
    const selectedDay = saved.days[0];
    const selectedHour = selectedDay?.hours?.[0];

    if (selectedDay == null || selectedHour == null) {
      toast.error("Pick a time slot first");
      return;
    }

    const lessonDate = getLessonDateFromWeekday(selectedDay.weekday);

    if (currentScheduledLesson) {
      const isValidToRescheduleLesson =
        lessonDate !== currentScheduledLesson.currentScheduledLessonDate ||
        selectedHour !== currentScheduledLesson.currentScheduledLessonHour;

      if (!isValidToRescheduleLesson) {
        toast.error(
          "Lesson Date and Time matches already scheduled time. Please select other time.",
        );
        return;
      }

      if (!saved.statusNote?.trim()) {
        toast.error("Reason field is required");
        return;
      }

      await updateLessonScheduleAndStatusAction({
        lessonId: currentScheduledLesson.currentScheduledLessonLessonId,
        teacherId,
        lessonDate,
        lessonHour: selectedHour,
        statusNote: saved.statusNote,
      });

      toast.success("Lesson rescheduled successfully!");
      setIsOpen(false);

      return;
    }

    if (!instrument) {
      toast.error("Select an instrument");
      return;
    }

    await createLessonAction({
      studentId,
      teacherId,
      lessonDate,
      lessonHour: selectedHour,
      instrument,
    });

    toast.success("Lesson booked successfully!");
    setIsOpen(false);
  };

  const handleCancelStatus = async (statusNote: string) => {
    if (currentScheduledLesson) {
      await updateLessonScheduleAndStatusAction({
        lessonId: currentScheduledLesson.currentScheduledLessonLessonId,
        teacherId,
        lessonDate: currentScheduledLesson.currentScheduledLessonDate,
        lessonHour: currentScheduledLesson.currentScheduledLessonHour,
        lessonStatus: "cancelled",
        statusNote,
      });
    }

    toast.success("Lesson cancelled successfully!");
    setIsOpen(false);
  };

  const updateLessonStatusAsCompleted = async () => {
    if (currentScheduledLesson) {
      await updateLessonScheduleAndStatusAction({
        lessonId: currentScheduledLesson.currentScheduledLessonLessonId,
        teacherId,
        lessonDate: currentScheduledLesson.currentScheduledLessonDate,
        lessonHour: currentScheduledLesson?.currentScheduledLessonHour,
        lessonStatus: "completed",
        statusNote: "completed",
      });
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {isTeacher && isCompletable && (
        <button
          onClick={updateLessonStatusAsCompleted}
          type="button"
          disabled={isCompleted}
          className={`rounded border px-3 py-1 w-full mx-auto ${isCompleted ? "bg-green-300 opacity-60" : ""}`}
        >
          {isCompleted ? "✓ Completed" : "Mark as completed"}
        </button>
      )}

      {currentScheduledLesson?.currentScheduledLessonStatus !== "cancelled" && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`rounded border px-3 py-1 w-full mx-auto ${isDisabled ? "opacity-40" : ""}`}
          disabled={isDisabled}
        >
          {buttonLabel}
        </button>
      )}

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
            currentScheduledLesson={currentScheduledLesson}
            handleDeleteStatus={handleCancelStatus}
          />
          {!currentScheduledLesson && (
            <div className="border-t mt-2">
              <h3 className="my-2">Selecet instrument</h3>
              <select
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="" disabled>
                  Select an instrument
                </option>
                {teacherInstruments.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BookingScheduleAction;
