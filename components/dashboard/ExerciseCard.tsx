import { Check, X } from "lucide-react";
import { getTodayWeekDay } from "@/lib/date";
import type { Exercise } from "@/app/dashboard/types";

type Props = {
  exercise: Exercise;
};

const getButtonText = (isDoneThisWeek: boolean, practicedToday: boolean) => {
  if (isDoneThisWeek) {
    return "Completed";
  }
  if (practicedToday) {
    return "Practiced today";
  }
  return "Mark as practiced today";
};

const ExerciseCard = ({ exercise }: Props) => {
  const practicedCount = exercise.practicedDaysThisWeek.length;
  const target = exercise.targetPerWeek;

  const isDoneThisWeek = practicedCount >= target;

  const today = getTodayWeekDay();
  const practicedToday = exercise.practicedDaysThisWeek.includes(today);
  const buttonText = getButtonText(isDoneThisWeek, practicedToday);
  return (
    <div className="flex flex-col gap-2 max-w-72 p-2 border rounded-lg">
      <p>{exercise.title}</p>
      <p>
        {exercise.instrument} •{" "}
        <span className="capitalize">{exercise.difficulty}</span>
      </p>
      <p>{exercise.goal}</p>
      <p className="flex items-center gap-2 text-sm">
        Practiced today:
        {practicedToday ? (
          <Check className="text-green-500 w-4 h-4" />
        ) : (
          <X className="text-red-500 w-4 h-4" />
        )}
      </p>
      <p className="text-sm text-gray-600">
        Weekly progress:{" "}
        <span className="font-semibold text-black">{practicedCount}</span>/
        {target}
      </p>
      <button
        className="border px-2 py-1 rounded-lg disabled:opacity-50"
        disabled={isDoneThisWeek || practicedToday}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default ExerciseCard;
