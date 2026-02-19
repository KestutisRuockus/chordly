"use client";

import { LESSON_LENGTH } from "@/lib/constants";

type Props = {
  hour: number;
  selectedHours: number[];
  onToggle: (hour: number) => void;
  disabled: boolean;
  isSlotBooked: boolean;
};

const HourSlotButton = ({
  hour,
  selectedHours,
  onToggle,
  disabled,
  isSlotBooked,
}: Props) => {
  const isActive = selectedHours.includes(hour);

  const start = String(hour).padStart(2, "0");
  const label = `${start}:00 - ${start}:${LESSON_LENGTH}`;

  const baseClass =
    "rounded border px-3 py-2 text-xs text-center text-foreground";
  const activeClass =
    "bg-primary text-primary-foreground border-muted-foreground cursor-pointer";
  const inactiveClass = "bg-background border-slate-300 hover:bg-slate-100";
  const disabledClass = "opacity-40";
  const bookedClass = "bg-destructive text-primary-foreground border-red-500";

  const className = [
    baseClass,
    disabled
      ? inactiveClass
      : isSlotBooked
        ? bookedClass
        : isActive
          ? activeClass
          : inactiveClass,
    disabled && disabledClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      onClick={() => onToggle(hour)}
      className={className}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default HourSlotButton;
