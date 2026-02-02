"use client";

import type {
  CurrentScheduledLesson,
  TeacherWeeklySchedule,
  WeekDayNumber,
} from "./teacherSchedule/types";
import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "./ui/Modal";
import SchedulePicker from "./SchedulePicker";
import { isLessonFinished, isLessonLocked } from "@/lib/date";
import {
  createLessonAction,
  updateLessonScheduleAndStatusAction,
} from "@/app/actions/lessonActions";
import { useRouter } from "next/navigation";

type Props = {
  buttonLabel: string;
  studentId: string;
  teacherId: string;
  teacherWeeklySchedule: TeacherWeeklySchedule;
  teacherInstruments: string[];
  currentScheduledLesson?: CurrentScheduledLesson;
  currentRole?: RoleType;
  teacherBookedSlots?: LessonRow[];
};

const BookingScheduleAction = ({
  buttonLabel,
  studentId,
  teacherId,
  teacherWeeklySchedule,
  teacherInstruments,
  currentScheduledLesson,
  currentRole,
  teacherBookedSlots,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [instrument, setInstrument] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const isFinishedLesson =
    currentScheduledLesson &&
    isLessonFinished(
      currentScheduledLesson.currentScheduledLessonDate,
      currentScheduledLesson.currentScheduledLessonHour,
    );

  const isLockedLesson =
    currentScheduledLesson &&
    isLessonLocked(
      currentScheduledLesson.currentScheduledLessonDate,
      currentScheduledLesson.currentScheduledLessonHour,
    );

  const isTeacher = currentRole === "teacher";

  const isDisabled =
    currentScheduledLesson &&
    ((!isTeacher && (isLockedLesson || isFinishedLesson)) ||
      (isTeacher && isFinishedLesson));

  const showTooltip =
    currentScheduledLesson && !isTeacher && isLockedLesson && !isFinishedLesson;

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
    dateKey?: string;
    statusNote?: string;
  }) => {
    if (isSubmitting) {
      return;
    }

    const selectedDay = saved.days[0];
    const selectedHour = selectedDay?.hours?.[0];

    if (selectedDay == null || selectedHour == null) {
      toast.error("Pick a time slot first");
      return;
    }

    if (!saved.dateKey) {
      toast.error("Select a day first");
      return;
    }

    const lessonDate = saved.dateKey;

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

      setIsSubmitting(true);

      try {
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
      } catch (err) {
        if (err instanceof Error) {
          switch (err.message) {
            case "STUDENT_SLOT_CONFLICT":
              toast.error(
                "The student already has a lesson scheduled at this time.",
              );
              break;

            case "TEACHER_SLOT_BOOKED":
              toast.error(
                "The teacher already has a lesson scheduled at this time..",
              );
              break;

            case "LESSON_NOT_FOUND":
              toast.error(
                "Lesson no longer exists. Please refresh and try again.",
              );
              break;

            default:
              toast.error("Something went wrong. Please try again.");
              break;
          }
        }

        router.refresh();
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    if (!instrument) {
      toast.error("Select an instrument");
      return;
    }

    setIsSubmitting(true);

    try {
      await createLessonAction({
        studentId,
        teacherId,
        lessonDate,
        lessonHour: selectedHour,
        instrument,
      });

      toast.success("Lesson booked successfully!");
      setIsOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "STUDENT_SLOT_CONFLICT") {
          toast.error("You already have a lesson scheduled at this time.");
        } else if (err.message === "TEACHER_SLOT_BOOKED") {
          toast.error("This time slot is no longer available.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
      router.refresh();
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelStatus = async (statusNote: string) => {
    if (isSubmitting) {
      return;
    }

    if (currentScheduledLesson) {
      setIsSubmitting(true);
      try {
        await updateLessonScheduleAndStatusAction({
          lessonId: currentScheduledLesson.currentScheduledLessonLessonId,
          teacherId,
          lessonDate: currentScheduledLesson.currentScheduledLessonDate,
          lessonHour: currentScheduledLesson.currentScheduledLessonHour,
          lessonStatus: "cancelled",
          statusNote,
        });

        toast.success("Lesson cancelled successfully!");
        setIsOpen(false);
      } catch (err) {
        if (err) {
          console.log("ERR: ", err);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateLessonStatusAsCompleted = async () => {
    if (isSubmitting) {
      return;
    }

    if (currentScheduledLesson) {
      setIsSubmitting(true);

      try {
        await updateLessonScheduleAndStatusAction({
          lessonId: currentScheduledLesson.currentScheduledLessonLessonId,
          teacherId,
          lessonDate: currentScheduledLesson.currentScheduledLessonDate,
          lessonHour: currentScheduledLesson?.currentScheduledLessonHour,
          lessonStatus: "completed",
          statusNote: "",
        });
        toast.success("Lesson status changed successfully!");
      } catch (err) {
        if (err) {
          console.log("ERR: ", err);
        }
      } finally {
        setIsSubmitting(false);
      }
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

      {currentScheduledLesson?.currentScheduledLessonStatus !== "cancelled" &&
        currentScheduledLesson?.currentScheduledLessonStatus !==
          "completed" && (
          <div
            title={
              showTooltip
                ? "Rescheduling is not available less than 2 hours before the lesson."
                : undefined
            }
            className="inline-block"
          >
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`rounded border px-3 py-1 w-full mx-auto ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              disabled={isDisabled}
            >
              {buttonLabel}
            </button>
          </div>
        )}

      {isOpen && (
        <Modal
          title={
            currentScheduledLesson ? "Reschedule a lesson" : "Book a lesson"
          }
          onClose={() => setIsOpen(false)}
          closeOnOverlayClick={true}
        >
          <SchedulePicker
            teacherWeeklySchedule={teacherWeeklySchedule}
            onSubmit={handleSubmit}
            selectionMode="single"
            currentScheduledLesson={currentScheduledLesson}
            handleDeleteStatus={handleCancelStatus}
            teacherBookedSlots={teacherBookedSlots}
            isSubmitting={isSubmitting}
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
