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
import { useState } from "react";

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
  const [showCancelled, setShowCancelled] = useState(true);
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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your schedule</h2>
        <label className="inline-flex items-center cursor-pointer bg-gray-300 py-1 px-2 rounded-md">
          <span className="mr-3 text-sm font-medium text-gray-900">
            Cancelled lessons
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showCancelled}
            onChange={(e) => setShowCancelled(e.target.checked)}
          />
          <div className="relative w-9 h-5 bg-red-400 peer-checked:bg-green-500 rounded-full transition-colors duration-300">
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5
      transition-transform duration-300 ease-in-out
      ${showCancelled ? "translate-x-0" : "translate-x-3.5"}`}
            />
          </div>
        </label>
      </div>
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
            showCancelledLessons={showCancelled}
          />
        ))}
      </div>
    </Section>
  );
};

export default WeekCalendar;
