"use client";

import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import Section from "../../layout/Section";
import WeekDayHeader from "./WeekDayHeader";
import { addDays, formatDateKey, getTodayWeekDay } from "@/lib/date";
import { isSameDay } from "../helpers/getPracticeSummary";
import { CALENDAR_RANGE_DAYS } from "@/lib/constants";
import Link from "next/link";

type Props = {
  lessons: LessonRow[];
  currentRole: RoleType;
  scheduleByTeacherId: TeacherScheduleByTeacherId;
  fromDate: string;
  offsetWeeks: number;
  teacherBookedSlots: Record<string, LessonRow[]>;
};

const WeekCalendar = ({
  lessons,
  currentRole,
  scheduleByTeacherId,
  fromDate,
  offsetWeeks,
  teacherBookedSlots,
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

  const prevOffsetWeeks = offsetWeeks - 1;
  const nextOffsetWeeks = offsetWeeks + 1;

  return (
    <Section>
      <h2 className="text-xl font-bold">Your schedule</h2>
      <div className="flex gap-4 mt-2 mb-1">
        <Link
          href={`/dashboard/${currentRole}?offset=${prevOffsetWeeks}`}
          className="text-sm"
        >
          ← Previous
        </Link>

        <Link href={`/dashboard/${currentRole}?offset=0`} className="text-sm">
          Today
        </Link>

        <Link
          href={`/dashboard/${currentRole}?offset=${nextOffsetWeeks}`}
          className="text-sm"
        >
          Next →
        </Link>
      </div>
      <div className="grid grid-cols-7 gap-3 max-h-120 overflow-y-auto">
        {weekDays.map((day) => (
          <WeekDayHeader
            key={day.key}
            day={day}
            currentRole={currentRole}
            scheduleByTeacherId={scheduleByTeacherId}
            teacherBookedSlots={teacherBookedSlots}
          />
        ))}
      </div>
    </Section>
  );
};

export default WeekCalendar;
