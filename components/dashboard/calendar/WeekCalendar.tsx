"use client";

import type { RoleType } from "@/types/role";
import type { LessonRow } from "@/db/types";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import Section from "../../layout/Section";
import WeekDayHeader from "./WeekDayHeader";
import { addDays, formatDateKey, getTodayWeekDay } from "@/lib/date";
import { isSameDay } from "../helpers/getPracticeSummary";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubHeading from "@/components/ui/SubHeading";
import { useScreenSize } from "@/hooks/useCalendarResponsive/useScreenSize";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffectEvent } from "react";

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
  const days = useScreenSize();
  const router = useRouter();
  const now = new Date();
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    7: "grid-cols-7",
  }[days];

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

  const weekDays = Array.from({ length: days }, (_, i) => {
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

  const onDaysChange = useEffectEvent(() => {
    router.push(`/dashboard/${currentRole}?offset=0&days=${days}`);
  });

  useEffect(() => {
    onDaysChange();
  }, [days]);

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SubHeading subHeading="Your schedule" />
        <label className="inline-flex items-center cursor-pointer bg-gray-300 py-1 px-2 rounded-md">
          <span className="mr-3 text-sm font-medium text-foreground">
            Cancelled lessons
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showCancelled}
            onChange={(e) => setShowCancelled(e.target.checked)}
          />
          <div className="relative w-9 h-5 bg-destructive peer-checked:bg-success rounded-full transition-colors duration-300">
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5
      transition-transform duration-300 ease-in-out
      ${showCancelled ? "translate-x-0" : "translate-x-3.5"}`}
            />
          </div>
        </label>
      </div>
      <div className="flex gap-4 mt-2 mb-1 text-foreground">
        <Link
          href={`/dashboard/${currentRole}?offset=${prevOffsetWeeks}&days=${days}`}
          className="text-sm hover:text-foreground/70 transition-colors duration-300"
        >
          ← Previous
        </Link>

        <Link
          href={`/dashboard/${currentRole}?offset=0&days=${days}`}
          className="text-sm hover:text-foreground/70 transition-colors duration-300"
        >
          Today
        </Link>

        <Link
          href={`/dashboard/${currentRole}?offset=${nextOffsetWeeks}&days=${days}`}
          className="text-sm hover:text-foreground/70 transition-colors duration-300"
        >
          Next →
        </Link>
      </div>
      <div
        className={cn(
          "grid gap-3 max-h-120 overflow-y-auto justify-items-center",
          gridCols,
        )}
      >
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
