import { LessonCardProps } from "@/app/dashboard/types";

const LessonCard = ({
  currentRole,
  lessonDate,
  lessonTime,
  lessonType,
  lessonStatus,
  participantName,
  instrument,
}: LessonCardProps) => {
  return (
    <li className="list-none flex flex-col gap-2 my-3">
      <p>
        Lesson Date: <span className="font-bold">{lessonDate}</span>
      </p>
      <p>
        Lesson Time: <span className="font-bold">{lessonTime}</span>
      </p>
      <p>
        {currentRole === "student" ? "Teacher" : "Student"} Name:{" "}
        <span className="font-bold">{participantName}</span>
      </p>
      <p>
        Instrument: <span className="font-bold">{instrument}</span>
      </p>
      <p>
        Lesson Type: <span className="font-bold capitalize">{lessonType}</span>
      </p>
      <p>
        Lesson Status:{" "}
        <span className="font-bold capitalize">{lessonStatus}</span>
      </p>
      <button className="border px-2">Reschedule lesson</button>
    </li>
  );
};

export default LessonCard;
