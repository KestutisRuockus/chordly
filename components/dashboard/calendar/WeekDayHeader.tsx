import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import LessonCard from "../LessonCard";

type DayColumn = {
  key: string;
  label: string;
  dayNumber: number;
  isToday: boolean;
  lessons: LessonRow[];
};

type Props = {
  day: DayColumn;
  currentRole: RoleType;
};

const WeekDayHeader = ({ day, currentRole }: Props) => {
  return (
    <div
      className={`rounded-xl border p-3 flex flex-col gap-3 ${
        day.isToday ? "border-black" : "border-gray-300"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-xs text-gray-500">{day.label}</p>
          <p className="font-semibold">{day.dayNumber}</p>
        </div>

        {day.lessons.length > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full border">
            {day.lessons.length}
          </span>
        )}
      </div>

      {day.lessons.length > 0 ? (
        <div className="flex flex-col gap-2">
          {day.lessons.map((lesson) => (
            <LessonCard key={lesson.id} currentRole={currentRole} {...lesson} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">No lessons</p>
      )}
    </div>
  );
};

export default WeekDayHeader;
