import type { LessonCardProps } from "@/app/dashboard/types";
import StatusBadge from "./calendar/StatusBadge";
import { formatLessonTime, formatMonthDayFromKey } from "@/lib/date";
import BookingScheduleAction from "../BookingScheduleAction";

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
}: LessonCardProps) => {
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
      <p className="w-fit">{participantName}</p>
      <p className="mb-1">
        {instrument} • {lessonType}
      </p>
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
          />
        ) : (
          <span className="text-[10px] text-gray-400">
            Schedule not available
          </span>
        )}
      </div>
      <StatusBadge status={lessonStatus} statusNote={statusNote} />
    </article>
  );
};

export default LessonCard;
