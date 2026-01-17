import Section from "../../layout/Section";
import type { RoleType } from "@/types/role";
import WeekDayHeader from "./WeekDayHeader";
import { formatDateKey, getMonday, WEEK_DAYS } from "@/lib/date";
import type { Lesson } from "@/app/dashboard/types";
import { isSameDay } from "../helpers/getPracticeSummary";

type Props = {
  lessons: Lesson[];
  currentRole: RoleType;
};

const WeekCalendar = ({ lessons, currentRole }: Props) => {
  const now = new Date();
  const monday = getMonday(now);

  const lessonsByDate = lessons.reduce<Record<string, Lesson[]>>((acc, l) => {
    (acc[l.lessonDate] ??= []).push(l);
    return acc;
  }, {});

  Object.values(lessonsByDate).forEach((arr) =>
    arr.sort((a, b) => a.lessonTime.localeCompare(b.lessonTime))
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
          <WeekDayHeader key={day.key} day={day} currentRole={currentRole} />
        ))}
      </div>
    </Section>
  );
};

export default WeekCalendar;
