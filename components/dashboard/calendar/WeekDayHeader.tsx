import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import LessonCard from "../LessonCard";
import { formatMonthDayFromKey } from "@/lib/date";

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
  scheduleByTeacherId: TeacherScheduleByTeacherId;
  teacherBookedSlots: Record<string, LessonRow[]>;
  showCancelledLessons: boolean;
};

const WeekDayHeader = ({
  day,
  currentRole,
  scheduleByTeacherId,
  teacherBookedSlots,
  showCancelledLessons,
}: Props) => {
  const visibleLessons = day.lessons.filter(
    (lesson) => showCancelledLessons || lesson.lessonStatus !== "cancelled",
  );
  return (
    <div
      className={`rounded-xl border p-3 flex flex-col gap-3 max-w-52 w-full ${
        day.isToday ? "border-black" : "border-gray-300"
      } relative`}
    >
      <div className="flex items-baseline justify-between sticky top-0 p-1 bg-gray-100 z-10">
        <div>
          <p className="text-xs text-muted-foreground">{day.label}</p>
          <p className="font-semibold text-sm text-foreground">
            {formatMonthDayFromKey(day.key)}
          </p>
        </div>

        {day.lessons.length > 0 && (
          <span className="text-xs text-foreground px-2 py-0.5 rounded-full border">
            {day.lessons.length}
          </span>
        )}
      </div>

      {day.lessons.length > 0 ? (
        <div className="flex flex-col items-center gap-2">
          {visibleLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              currentRole={currentRole}
              {...lesson}
              teacherWeeklySchedule={scheduleByTeacherId[lesson.teacherId]}
              teacherBookedSlots={teacherBookedSlots[lesson.teacherId]}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400">No lessons</p>
      )}
    </div>
  );
};

export default WeekDayHeader;
