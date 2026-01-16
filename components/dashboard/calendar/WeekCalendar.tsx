import Section from "../../layout/Section";
import type { LessonCardProps } from "@/app/dashboard/types";
import type { RoleType } from "@/types/role";
import WeekDayHeader from "./WeekDayHeader";

type Lesson = Omit<LessonCardProps, "currentRole">;

type Props = {
  lessons: Lesson[];
  currentRole: RoleType;
};

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getMonday = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d;
};

const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

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
      label: dayLabels[i],
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
