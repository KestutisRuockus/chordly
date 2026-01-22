"use client";

import { LESSON_LENGTH } from "@/content/dummyData";

type Props = {
  hour: number;
  selectedHours: number[];
  onToggle: (hour: number) => void;
  disabled: boolean;
};

const HourSlotButton = ({ hour, selectedHours, onToggle, disabled }: Props) => {
  const isActive = selectedHours.includes(hour);

  const start = String(hour).padStart(2, "0");
  const label = `${start}:00 - ${start}:${LESSON_LENGTH}`;

  const baseClass = "rounded border px-3 py-2 text-sm text-center";
  const activeClass = "bg-emerald-600 text-white border-emerald-600";
  const inactiveClass = "bg-white border-slate-300 hover:bg-slate-100";
  const disabledClass = "opacity-40";

  return (
    <button
      type="button"
      onClick={() => onToggle(hour)}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass} ${disabled && disabledClass}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default HourSlotButton;
