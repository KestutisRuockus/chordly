"use client";

import type { LessonCardProps, LessonType } from "@/app/dashboard/types";
import StatusBadge from "./calendar/StatusBadge";
import {
  formatLessonTime,
  formatMonthDayFromKey,
  isLessonFinished,
  isLessonLocked,
} from "@/lib/date";
import BookingScheduleAction from "../BookingScheduleAction";
import { Headset, MapPin, Pencil } from "lucide-react";
import { useState } from "react";
import Modal from "../ui/Modal";
import LessonTypeSelector from "../ui/LessonTypeSelector";
import { updateLessonTypeAction } from "@/app/actions/lessonActions";
import { toast } from "sonner";
import { getTeacherLessonTypeAction } from "@/app/actions/teacher/getTeacherLessonTypeAction";
import NoMeetingUrlProvided from "./calendar/NoMeetingUrlProvided";
import NoLessonAddressProvided from "./calendar/NoLessonAddressProvided";

const LessonCard = ({
  id,
  teacherId,
  studentId,
  currentRole,
  lessonDate,
  lessonHour,
  lessonType,
  lessonStatus,
  statusNote,
  isUpcomingCard,
  instrument,
  participantName,
  teacherWeeklySchedule,
  teacherBookedSlots,
  location,
  meetingUrl,
}: LessonCardProps) => {
  const [isEditLessonTypeOpen, setIsEditLessonTypeOpen] = useState(false);
  const [selectedLessonType, setSelectedLessonType] =
    useState<LessonType>(lessonType);
  const [teacherLessonType, setTeacherLessonType] = useState<LessonType | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditIconDisabbled =
    lessonStatus === "cancelled" ||
    isLessonFinished(lessonDate, lessonHour) ||
    isLessonLocked(lessonDate, lessonHour) ||
    selectedLessonType === teacherLessonType;

  const handleOpenEdit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const fetchedType = await getTeacherLessonTypeAction(teacherId);
      setTeacherLessonType(fetchedType);
      if (fetchedType !== "hybrid") {
        toast.warning("You caanot change lesson type for this teacher");
        setIsSubmitting(false);
        return;
      }
      setIsEditLessonTypeOpen(true);
    } catch {
      toast.error("Something went wrong. Please try again later");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLessonTypeUpdate = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateLessonTypeAction({
        lessonId: id,
        studentId,
        teacherId,
        lessonType: selectedLessonType,
      });

      toast.success("Lesson type updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case "LESSON_NOT_FOUND":
            toast.error("Lesson not found. Please refresh and try again.");
            break;
          case "LESSON_TYPE_NOT_CHANGED":
            toast.error("You selected the same lesson type. Nothing changed.");
            break;
          default:
            toast.error("Something went wrong. Please try again later.");
        }
      }
    } finally {
      setIsSubmitting(false);
      setIsEditLessonTypeOpen(false);
    }
  };

  if (isUpcomingCard) {
    return (
      <article className="list-none flex flex-col gap-2 my-3">
        <p>
          Lesson Date: <span className="font-bold">{lessonDate}</span>
        </p>
        <p>
          Lesson Time:{" "}
          <span className="font-bold">{formatLessonTime(lessonHour)}</span>
        </p>
        <p>
          {currentRole === "student" ? "Teacher" : "Student"} Name:{" "}
          <span className="font-bold">{participantName}</span>
        </p>
        <p>
          Instrument: <span className="font-bold">{instrument}</span>
        </p>
        <p>
          Lesson Type:{" "}
          <span className="font-bold capitalize">{lessonType}</span>
        </p>
        <p>
          Lesson Status:{" "}
          <span className="font-bold capitalize">{lessonStatus}</span>
        </p>
      </article>
    );
  }
  return (
    <article className="text-xs border p-2 pt-5 relative rounded-lg">
      <div className="flex">
        <p>{formatLessonTime(lessonHour)}</p>
        {!participantName && <p>{`, ${formatMonthDayFromKey(lessonDate)}`}</p>}
      </div>
      <div className="flex gap-1" title="Change lesson type">
        <p>
          {instrument} • {lessonType}
        </p>
        <button onClick={handleOpenEdit} disabled={isEditIconDisabbled}>
          <Pencil
            size={12}
            className={`mt-0.5 bg-gray-300 p-0.5 rounded-sm ${isEditIconDisabbled ? "opacity-50 cursor-not-allowed" : "hover:opacity-70 cursor-pointer"}`}
          />
        </button>
      </div>
      <p className="w-fit">{participantName}</p>
      <div className="flex gap-1 items-center mb-1">
        {lessonType === "online" ? (
          <>
            <Headset size={12} />
            <p>{meetingUrl ? <p>{meetingUrl}</p> : <NoMeetingUrlProvided />}</p>
          </>
        ) : (
          <>
            <MapPin size={12} />
            <p>{location ? <p>{location}</p> : <NoLessonAddressProvided />}</p>
          </>
        )}
      </div>

      <div className="flex justify-center">
        {teacherWeeklySchedule ? (
          <BookingScheduleAction
            buttonLabel="Reschedule lesson"
            teacherId={teacherId}
            studentId={studentId}
            teacherWeeklySchedule={teacherWeeklySchedule}
            teacherInstruments={[instrument]}
            currentScheduledLesson={{
              currentScheduledLessonLessonId: id,
              currentScheduledLessonDate: lessonDate,
              currentScheduledLessonHour: lessonHour,
              currentScheduledLessonStatus: lessonStatus,
            }}
            currentRole={currentRole}
            teacherBookedSlots={teacherBookedSlots}
          />
        ) : (
          <span className="text-[10px] text-gray-400">
            Schedule not available
          </span>
        )}
      </div>
      <StatusBadge status={lessonStatus} statusNote={statusNote} />
      {isEditLessonTypeOpen && (
        <Modal
          title={""}
          onClose={() => {
            setIsEditLessonTypeOpen(false);
          }}
          closeOnOverlayClick={true}
        >
          <LessonTypeSelector
            lessonType={teacherLessonType}
            selectedLessonType={selectedLessonType}
            onChange={setSelectedLessonType}
          />
          <button
            onClick={handleLessonTypeUpdate}
            className="border rounded-md py- px-2 cursor-pointer mt-2"
          >
            {isSubmitting ? "Updating..." : "Update Lesson Type"}
          </button>
        </Modal>
      )}
    </article>
  );
};

export default LessonCard;
