import type { LessonCardProps } from "@/app/dashboard/types";
import StatusBadge from "./calendar/StatusBadge";
import Link from "next/link";
import { formatLessonTime } from "@/lib/date";

const LessonCard = ({
  currentRole,
  lessonDate,
  lessonHour,
  lessonType,
  lessonStatus,
  isUpcomingCard,
  instrument,
  participantName,
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
        <button className="border px-2">Reschedule lesson</button>
      </article>
    );
  }
  return (
    <article className="text-xs border p-2 relative rounded-lg">
      <p>{formatLessonTime(lessonHour)}</p>
      <p>{participantName}</p>
      <p className="mb-1">
        {instrument} • {lessonType}
      </p>
      <Link href={""} className="border px-5">
        Reschedule lesson
      </Link>
      <StatusBadge status={lessonStatus} />
    </article>
  );
};

export default LessonCard;
