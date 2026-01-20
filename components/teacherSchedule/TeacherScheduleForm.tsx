"use client";

import type {
  SaveTeacherWeeklyScheduleInput,
  TeacherWeeklySchedule,
  WeekDayNumber,
} from "./types";
import { toWeekDayNumber } from "./types";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatDateKey, getMonday, WEEK_DAYS } from "@/lib/date";
import { isSameDay } from "../dashboard/helpers/getPracticeSummary";
import WeekDayButton from "./WeekDayButton";
import HourSlotButton from "./HourSlotButton";
import { SaveTeacherScheduleAction } from "@/app/actions/teacherSchedule";

type Props = {
  onClose: () => void;
  teacherId: string;
  teacherWeeklySchedule: TeacherWeeklySchedule;
};

const TeacherScheduleForm = ({
  onClose,
  teacherId,
  teacherWeeklySchedule,
}: Props) => {
  const now = useMemo(() => new Date(), []);
  const monday = useMemo(() => getMonday(now), [now]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);

      return {
        key: formatDateKey(d),
        weekday: i as WeekDayNumber,
        label: WEEK_DAYS[i],
        dayNumber: d.getDate(),
        isToday: isSameDay(d, now),
      };
    });
  }, [monday, now]);

  const initialScheduleMap = useMemo(() => {
    return Object.fromEntries(
      teacherWeeklySchedule.days.map((d) => [d.weekday, d.hours]),
    ) as Partial<Record<number, number[]>>;
  }, [teacherWeeklySchedule.days]);

  const firstWorkingWeekday = teacherWeeklySchedule.days[0]?.weekday ?? 0;

  const [scheduleMap, setScheduleMap] =
    useState<Partial<Record<number, number[]>>>(initialScheduleMap);

  const [selectedWeekday, setSelectedWeekday] =
    useState<WeekDayNumber>(firstWorkingWeekday);

  const [selectedHours, setSelectedHours] = useState<number[]>(
    scheduleMap[firstWorkingWeekday] ?? [],
  );

  const dayTimeSlots = useMemo(() => {
    const startHour = 7;
    const endHour = 22;
    return Array.from(
      { length: endHour - startHour + 1 },
      (_, i) => startHour + i,
    );
  }, []);

  const handleSelectDay = (weekday: WeekDayNumber) => {
    setSelectedWeekday(weekday);

    setSelectedHours(scheduleMap[weekday] ?? []);
  };

  const handleToggleHour = (hour: number) => {
    setSelectedHours((prev) => {
      const exists = prev.includes(hour);
      const hours = exists ? prev.filter((h) => h !== hour) : [...prev, hour];
      const sorted = hours.sort((a, b) => a - b);

      setScheduleMap((mapPrev) => {
        const updated = { ...mapPrev };

        if (sorted.length === 0) {
          delete updated[selectedWeekday];
        } else {
          updated[selectedWeekday] = sorted;
        }

        return updated;
      });

      return sorted;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextMap = {
      ...scheduleMap,
      [selectedWeekday]: selectedHours,
    };

    setScheduleMap(nextMap);

    const savedSchedule: SaveTeacherWeeklyScheduleInput = {
      teacherId,
      days: Object.entries(nextMap).map(([weekday, hours]) => ({
        weekday: toWeekDayNumber(Number(weekday)),
        hours: (hours ?? []).slice().sort((a, b) => a - b),
      })),
    };

    await SaveTeacherScheduleAction(savedSchedule);

    toast.success("Schedule saved!");
    onClose();
  };

  const toggleAllDay = () => {
    const newHours = selectedHours.length > 0 ? [] : dayTimeSlots;
    setSelectedHours(newHours);

    setScheduleMap((prev) => {
      const updated = { ...prev };
      if (newHours.length === 0) {
        delete updated[selectedWeekday];
      } else {
        updated[selectedWeekday] = newHours;
      }

      return updated;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-7 gap-3 mt-4">
        {weekDays.map((day) => (
          <WeekDayButton
            key={day.key}
            day={day}
            selectedWeekday={selectedWeekday}
            scheduleMap={scheduleMap}
            onSelect={handleSelectDay}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">
            Select available hours for {WEEK_DAYS[selectedWeekday]}
          </h3>
          <div
            onClick={toggleAllDay}
            className="border rounded-lg px-2 cursor-pointer"
          >
            {selectedHours.length === 0
              ? "Select all hours"
              : "Unselect all hours"}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {dayTimeSlots.map((hour) => (
            <HourSlotButton
              key={hour}
              hour={hour}
              selectedHours={selectedHours}
              onToggle={handleToggleHour}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="submit" className="rounded border px-4 py-2">
          Save
        </button>
      </div>
    </form>
  );
};

export default TeacherScheduleForm;
