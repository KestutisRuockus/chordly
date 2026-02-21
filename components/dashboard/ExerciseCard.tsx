"use client";

import type { ExerciseRow } from "@/db/types";
import { Check, X } from "lucide-react";
import { getTodayWeekDay } from "@/lib/date";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteExerciseAction,
  markExercisePracticedTodayAction,
} from "@/app/actions/teacher/exercisesActions";
import { cn } from "@/lib/utils";

type Props = {
  exercise: ExerciseRow;
  isStudent?: boolean;
  studentId: string;
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

const ExerciseCard = ({ exercise, isStudent = true, studentId }: Props) => {
  const practicedCount = exercise.practicedDaysThisWeek.length;
  const target = exercise.targetPerWeek;

  const isDoneThisWeek = practicedCount >= target;

  const today = getTodayWeekDay();
  const practicedToday = exercise.practicedDaysThisWeek.includes(today);
  const buttonText = getButtonText(isDoneThisWeek, practicedToday);

  const handleDelete = async () => {
    await deleteExerciseAction({ exerciseId: exercise.id, studentId });
    toast.success("Exercises successfully delted!");
  };

  const handleMarkPracticedToday = async () => {
    await markExercisePracticedTodayAction(exercise.id);
    toast.success("Exercises marked as practiced today");
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2 min-w-52 max-w-96 bg-background text-foreground p-2 rounded-lg relative",
        isDoneThisWeek || practicedToday ? "border border-success" : "border",
      )}
    >
      {!isStudent && (
        <div className="absolute right-0.5 top-0.5 flex gap-1">
          <Trash2 onClick={handleDelete} className="w-4 h-4 cursor-pointer" />
        </div>
      )}
      <div>
        <p>{exercise.title}</p>
        <p>
          {exercise.instrument} •{" "}
          <span className="capitalize">{exercise.difficulty}</span>
        </p>
        <p>{exercise.goal}</p>
        <p className="flex items-center gap-2 text-sm">
          Practiced today:
          {practicedToday ? (
            <Check className="text-success w-4 h-4" />
          ) : (
            <X className="text-destructive w-4 h-4" />
          )}
        </p>
        <p className="text-sm">
          Weekly progress: <b>{practicedCount}</b>/{target}
        </p>
      </div>
      <div>
        {isStudent && (
          <button
            onClick={handleMarkPracticedToday}
            className={cn(
              "border px-2 py-1 rounded-lg disabled:opacity-50 w-full text-foreground",
              isDoneThisWeek || practicedToday
                ? "bg-success text-success-foreground"
                : "hover:bg-primary/20 transition-colors duration-300",
            )}
            disabled={isDoneThisWeek || practicedToday}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;
