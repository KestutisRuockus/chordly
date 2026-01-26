import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import Section from "../../layout/Section";
import WeekDayHeader from "./WeekDayHeader";
import { addDays, formatDateKey, getTodayWeekDay } from "@/lib/date";
import { isSameDay } from "../helpers/getPracticeSummary";
import { CALENDAR_RANGE_DAYS } from "@/lib/constants";

type Props = {
  lessons: LessonRow[];
  currentRole: RoleType;
  scheduleByTeacherId: TeacherScheduleByTeacherId;
  fromDate: string;
};

const WeekCalendar = ({
  lessons,
  currentRole,
  scheduleByTeacherId,
  fromDate,
}: Props) => {
  const now = new Date();

  const [y, m, d] = fromDate.split("-").map(Number);
  const startDate = new Date(y, m - 1, d);
  startDate.setHours(0, 0, 0, 0);

  const lessonsByDate = lessons.reduce<Record<string, LessonRow[]>>(
    (acc, l) => {
      (acc[l.lessonDate] ??= []).push(l);
      return acc;
    },
    {},
  );

  Object.values(lessonsByDate).forEach((arr) =>
    arr.sort((a, b) => a.lessonHour - b.lessonHour),
  );

  const weekDays = Array.from({ length: CALENDAR_RANGE_DAYS }, (_, i) => {
    const dayDate = addDays(startDate, i);
    const dateKey = formatDateKey(dayDate);

    return {
      key: dateKey,
      label: getTodayWeekDay(dayDate),
      dayNumber: dayDate.getDate(),
      isToday: isSameDay(dayDate, now),
      lessons: lessonsByDate[dateKey] ?? [],
    };
  });

  return (
    <Section>
      <h2 className="text-xl font-bold">Next 7 days</h2>
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day) => (
          <WeekDayHeader
            key={day.key}
            day={day}
            currentRole={currentRole}
            scheduleByTeacherId={scheduleByTeacherId}
          />
        ))}
      </div>
    </Section>
  );
};

export default WeekCalendar;
