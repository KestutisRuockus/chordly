"use client";

type Props = {
  hour: number;
  durationMin: number;
  selectedHours: number[];
  onToggle: (hour: number) => void;
};

const HourSlotButton = ({
  hour,
  durationMin,
  selectedHours,
  onToggle,
}: Props) => {
  const isActive = selectedHours.includes(hour);

  const start = String(hour).padStart(2, "0");
  const label = `${start}:00 - ${start}:${durationMin}`;

  const baseClass = "rounded border px-3 py-2 text-sm text-center";
  const activeClass = "bg-emerald-600 text-white border-emerald-600";
  const inactiveClass = "bg-white border-slate-300 hover:bg-slate-100";

  return (
    <button
      type="button"
      onClick={() => onToggle(hour)}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
    >
      {label}
    </button>
  );
};

export default HourSlotButton;
