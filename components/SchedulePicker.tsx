"use client";

import type {
  CurrentScheduledLesson,
  TeacherWeeklySchedule,
  WeekDayNumber,
} from "./teacherSchedule/types";
import { toWeekDayNumber } from "./teacherSchedule/types";
import {
  formatDateKey,
  formatLessonTime,
  getToday,
  getTodayWeekDay,
  getWeekdayNumberFromDateString,
  WEEK_DAYS,
} from "@/lib/date";
import { useMemo, useState } from "react";
import { isSameDay } from "./dashboard/helpers/getPracticeSummary";
import HourSlotButton from "./teacherSchedule/HourSlotButton";
import WeekDayButton from "./teacherSchedule/WeekDayButton";
import { toast } from "sonner";
import { CALENDAR_RANGE_DAYS } from "@/lib/constants";

type ScheduleMap = Partial<Record<number, number[]>>;

type Props = {
  teacherWeeklySchedule: TeacherWeeklySchedule;
  onSubmit: (saved: {
    days: { weekday: WeekDayNumber; hours: number[] }[];
    dateKey?: string;
    statusNote?: string;
  }) => void;
  selectionMode: "multi" | "single";
  currentScheduledLesson?: CurrentScheduledLesson;
  handleDeleteStatus?: (statusNote: string) => void;
};

const SchedulePicker = ({
  teacherWeeklySchedule,
  onSubmit,
  selectionMode,
  currentScheduledLesson,
  handleDeleteStatus,
}: Props) => {
  const [showCancelValidationWindow, setShowCancelValidationWindow] =
    useState(false);
  const [statusNote, setStatusNote] = useState("");

  const currentLessonInfo = currentScheduledLesson
    ? `${currentScheduledLesson.currentScheduledLessonDate} • ${formatLessonTime(currentScheduledLesson?.currentScheduledLessonHour)}`
    : null;

  const today = useMemo(() => getToday(new Date()), []);

  const weekDays = useMemo(() => {
    return Array.from({ length: CALENDAR_RANGE_DAYS }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dateKey = formatDateKey(d);
      const weekday = getWeekdayNumberFromDateString(dateKey);

      return {
        key: dateKey,
        weekday,
        label: getTodayWeekDay(d),
        dayNumber: d.getDate(),
        isToday: isSameDay(d, today),
      };
    });
  }, [today]);

  const availableScheduleMap = useMemo(() => {
    return Object.fromEntries(
      teacherWeeklySchedule.days.map((d) => [d.weekday, d.hours]),
    ) as ScheduleMap;
  }, [teacherWeeklySchedule.days]);

  const activeWeekDay = getWeekdayNumberFromDateString(formatDateKey(today));

  const [scheduleMap, setScheduleMap] =
    useState<ScheduleMap>(availableScheduleMap);

  const [selectedWeekday, setSelectedWeekday] =
    useState<WeekDayNumber>(activeWeekDay);

  const [selectedDateKey, setSelectedDateKey] = useState<string>(
    formatDateKey(today),
  );

  const [selectedHours, setSelectedHours] = useState<number[]>(
    selectionMode === "single"
      ? currentScheduledLesson
        ? [currentScheduledLesson.currentScheduledLessonHour]
        : []
      : (scheduleMap[activeWeekDay] ?? []),
  );

  const dayTimeSlots = useMemo(() => {
    const startHour = 7;
    const endHour = 22;
    return Array.from(
      { length: endHour - startHour + 1 },
      (_, i) => startHour + i,
    );
  }, []);

  const currenScheduledtWeekday =
    currentScheduledLesson &&
    getWeekdayNumberFromDateString(
      currentScheduledLesson.currentScheduledLessonDate,
    );

  const handleSelectDay = (weekday: WeekDayNumber, dateKey: string) => {
    setSelectedWeekday(weekday);
    setSelectedDateKey(dateKey);

    if (selectionMode === "single" && currentScheduledLesson) {
      setSelectedHours(
        weekday === currenScheduledtWeekday
          ? [currentScheduledLesson.currentScheduledLessonHour]
          : [],
      );

      return;
    }

    if (selectionMode === "single") {
      setSelectedHours([]);
    } else {
      setSelectedHours(scheduleMap[weekday] ?? []);
    }
  };

  const availableHoursForSelectedDay =
    availableScheduleMap[selectedWeekday] ?? [];

  const handleToggleHour = (hour: number) => {
    if (selectionMode === "single") {
      if (!availableHoursForSelectedDay.includes(hour)) return;

      setSelectedHours((prev) => (prev[0] === hour ? [] : [hour]));
      return;
    }

    setSelectedHours((prev) => {
      const exists = prev.includes(hour);
      const hours = exists ? prev.filter((h) => h !== hour) : [...prev, hour];
      const sorted = hours.sort((a, b) => a - b);

      setScheduleMap((mapPrev) => {
        const updated = { ...mapPrev };

        if (sorted.length === 0) delete updated[selectedWeekday];
        else updated[selectedWeekday] = sorted;

        return updated;
      });

      return sorted;
    });
  };

  const toggleAllDay = () => {
    const newHours = selectedHours.length > 0 ? [] : dayTimeSlots;
    setSelectedHours(newHours);

    setScheduleMap((prev) => {
      const updated = { ...prev };

      if (newHours.length === 0) delete updated[selectedWeekday];
      else updated[selectedWeekday] = newHours;

      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectionMode === "multi") {
      const nextMap: ScheduleMap = {
        ...scheduleMap,
        [selectedWeekday]: selectedHours,
      };

      const days = Object.entries(nextMap).map(([weekday, hours]) => ({
        weekday: toWeekDayNumber(Number(weekday)),
        hours: (hours ?? []).slice().sort((a, b) => a - b),
      }));

      onSubmit({ days, statusNote });
      return;
    }

    if (!selectedDateKey) {
      toast.error("Select a day first");
      return;
    }

    const days = [
      {
        weekday: selectedWeekday,
        hours: selectedHours,
      },
    ];

    onSubmit({ days, dateKey: selectedDateKey, statusNote });
  };

  const openCancelValidationWindow = () => {
    if (!statusNote.trim()) {
      toast.error("Reason field is required");
      return;
    }
    setShowCancelValidationWindow(true);
  };

  const handleDelete = () => {
    if (!statusNote.trim()) {
      toast.error("Reason field is required");
      return;
    }
    handleDeleteStatus?.(statusNote);
    setShowCancelValidationWindow(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
      {showCancelValidationWindow && (
        <div className="absolute -top-11 right-0 bg-red-400 w-full h-101 z-50 rounded-lg flex flex-col gap-0 justify-center items-center">
          <p className="text-xl">Do you want to cancel Lesson?</p>
          <p>This action is permanent</p>
          <div className="flex gap-2 justify-center text-lg mt-6">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 border rounded-lg"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setShowCancelValidationWindow(false)}
              className="px-4 border rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-7 gap-3 mt-4">
        {weekDays.map((day) => {
          const isEnabled =
            selectionMode === "multi" ||
            (availableScheduleMap[day.weekday]?.length ?? 0) > 0;

          return (
            <WeekDayButton
              key={day.key}
              day={day}
              selectedWeekday={selectedWeekday}
              scheduleMap={
                selectionMode === "multi" ? scheduleMap : availableScheduleMap
              }
              onSelect={(weekday) => handleSelectDay(weekday, day.key)}
              hasAvailableHours={isEnabled}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">
            Select available hours for {WEEK_DAYS[selectedWeekday]}
          </h3>

          {selectionMode === "multi" && (
            <div
              onClick={toggleAllDay}
              className="border rounded-lg px-2 cursor-pointer"
            >
              {selectedHours.length === 0
                ? "Select all hours"
                : "Unselect all hours"}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {dayTimeSlots.map((hour) => {
            const disabled =
              selectionMode === "single" &&
              !availableHoursForSelectedDay.includes(hour);

            return (
              <HourSlotButton
                key={hour}
                hour={hour}
                selectedHours={selectedHours}
                onToggle={handleToggleHour}
                disabled={disabled}
              />
            );
          })}
        </div>
      </div>

      {currentScheduledLesson && (
        <div className="flex flex-col w-full h-40">
          <h3 className="p-1">Reason for rescheduling or cancelling</h3>
          <textarea
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
            className="w-full h-full border rounded-lg bg-slate-100 resize-none p-4"
          />
        </div>
      )}

      <div
        className={`flex ${currentScheduledLesson ? "justify-between" : "justify-end"} items-center gap-2`}
      >
        {currentScheduledLesson && (
          <div className="flex flex-col">
            <p>Current lesson scheduled at:</p>
            <p>{currentLessonInfo}</p>
          </div>
        )}
        <div className="flex gap-2">
          <button type="submit" className="rounded border px-4 py-2">
            Save
          </button>
          {currentScheduledLesson &&
            currentScheduledLesson.currentScheduledLessonStatus !==
              "cancelled" && (
              <button
                type="button"
                onClick={openCancelValidationWindow}
                className="rounded border px-4 py-2 bg-red-300 color"
              >
                Cancel lesson
              </button>
            )}
        </div>
      </div>
    </form>
  );
};

export default SchedulePicker;
