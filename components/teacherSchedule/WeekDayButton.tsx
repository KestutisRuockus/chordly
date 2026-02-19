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
  onSelect: (weekday: WeekDayNumber, dateKey: string) => void;
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
    "rounded border px-0 py-2 text-sm flex flex-col items-center text-foreground";
  const selectedClass = isSelected
    ? "bg-primary text-primary-foreground"
    : "bg-white";
  const hasHoursClass = hasHours ? "border-muted-foreground" : "border";
  const disabledClass = "opacity-40";

  return (
    <button
      type="button"
      onClick={() => onSelect(day.weekday, day.key)}
      className={`${baseClass} ${selectedClass} ${hasHoursClass} ${!hasAvailableHours && disabledClass}`}
      disabled={!hasAvailableHours}
    >
      <span className="font-medium">{day.label}</span>
      <span className="text-xs">{day.dayNumber}</span>
    </button>
  );
};

export default WeekDayButton;
