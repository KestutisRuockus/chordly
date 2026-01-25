import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import Section from "../../layout/Section";
import WeekDayHeader from "./WeekDayHeader";
import { formatDateKey, getMonday, WEEK_DAYS } from "@/lib/date";
import { isSameDay } from "../helpers/getPracticeSummary";

type Props = {
  lessons: LessonRow[];
  currentRole: RoleType;
  scheduleByTeacherId: TeacherScheduleByTeacherId;
};

const WeekCalendar = ({ lessons, currentRole, scheduleByTeacherId }: Props) => {
  const now = new Date();
  const monday = getMonday(now);

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

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const dateKey = formatDateKey(d);

    return {
      key: dateKey,
      label: WEEK_DAYS[i],
      dayNumber: d.getDate(),
      isToday: isSameDay(d, now),
      lessons: lessonsByDate[dateKey] ?? [],
    };
  });

  return (
    <Section>
      <h2 className="text-xl font-bold">This week</h2>

      <div className="grid grid-cols-7 gap-3 mt-4">
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
