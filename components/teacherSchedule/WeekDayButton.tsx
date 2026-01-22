"use client";

import { WeekDayNumber } from "./types";

type WeekDayItem = {
  key: string;
  weekday: WeekDayNumber;
  label: string;
  dayNumber: number;
};

type Props = {
  day: WeekDayItem;
  selectedWeekday: WeekDayNumber;
  scheduleMap: Partial<Record<number, number[]>>;
  onSelect: (weekday: WeekDayNumber) => void;
  hasAvailableHours: boolean;
};

const WeekDayButton = ({
  day,
  selectedWeekday,
  scheduleMap,
  onSelect,
  hasAvailableHours,
}: Props) => {
  const isSelected = day.weekday === selectedWeekday;

  const hasHours = (scheduleMap[day.weekday]?.length ?? 0) > 0;

  const baseClass =
    "rounded border px-2 py-2 text-sm flex flex-col items-center";
  const selectedClass = isSelected ? "bg-slate-900 text-white" : "bg-white";
  const hasHoursClass = hasHours ? "border-emerald-600" : "border-slate-300";
  const disabledClass = "opacity-40";

  return (
    <button
      type="button"
      onClick={() => onSelect(day.weekday)}
      className={`${baseClass} ${selectedClass} ${hasHoursClass} ${!hasAvailableHours && disabledClass}`}
      disabled={!hasAvailableHours}
    >
      <span className="font-medium">{day.label}</span>
      <span className="text-xs">{day.dayNumber}</span>
    </button>
  );
};

export default WeekDayButton;
