"use client";

import { createExerciseAction } from "@/app/actions/teacher/exercisesActions";
import type { ExerciseDifficulty, TargetPerWeek } from "@/app/dashboard/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
  setFormIsEmpty: Dispatch<SetStateAction<boolean>>;
  studentId: string;
};

type FormState = {
  title: string;
  instrument: string;
  difficulty: ExerciseDifficulty;
  goal: string;
  targetPerWeek: TargetPerWeek;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const ExerciseForm = ({ onClose, setFormIsEmpty, studentId }: Props) => {
  const [form, setForm] = useState<FormState>({
    title: "",
    instrument: "",
    difficulty: "beginner",
    goal: "",
    targetPerWeek: 1,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const checkOrFormIsEmpty = (formValErrors: FormState) => {
    const isEmpty =
      formValErrors.title.trim() === "" &&
      formValErrors.instrument.trim() === "" &&
      formValErrors.goal.trim() === "";
    setFormIsEmpty(isEmpty);
  };

  const handleText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const formVal: FormState = {
      ...form,
      [name]: value,
    } as FormState;

    setForm(formVal);
    checkOrFormIsEmpty(formVal);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formVal: FormState = {
      ...form,
      targetPerWeek: Number(e.target.value) as TargetPerWeek,
    };

    setForm(formVal);
    checkOrFormIsEmpty(formVal);
    setErrors((prev) => ({ ...prev, targetPerWeek: undefined }));
  };

  const handleDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const formVal: FormState = {
      ...form,
      difficulty: e.target.value as ExerciseDifficulty,
    };

    setForm(formVal);
    checkOrFormIsEmpty(formVal);
    setErrors((prev) => ({ ...prev, difficulty: undefined }));
  };

  const validate = (data: FormState): FormErrors => {
    const formValErrors: FormErrors = {};

    if (!data.title.trim()) formValErrors.title = "Title is required.";
    if (!data.instrument.trim())
      formValErrors.instrument = "Instrument is required.";
    if (!data.goal.trim()) formValErrors.goal = "Goal is required.";

    return formValErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValErrors = validate(form);
    setErrors(formValErrors);

    if (!form.title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!form.instrument.trim()) {
      toast.error("Instrument is required.");
      return;
    }

    if (!form.goal.trim()) {
      toast.error("Goal is required.");
      return;
    }

    const newExercise = {
      studentId,
      title: form.title,
      instrument: form.instrument,
      difficulty: form.difficulty,
      goal: form.goal,
      targetPerWeek: form.targetPerWeek,
      practicedDaysThisWeek: [],
    };

    await createExerciseAction(newExercise);

    toast.success("Exercise created!");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
      <div className="flex flex-col gap-1">
        <input
          name="title"
          value={form.title}
          onChange={handleText}
          className="border rounded-lg p-2"
          placeholder="Title"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          name="instrument"
          value={form.instrument}
          onChange={handleText}
          className="border rounded-lg p-2"
          placeholder="Instrument"
        />
        {errors.instrument && (
          <p className="text-sm text-red-500">{errors.instrument}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <select
          value={form.difficulty}
          onChange={handleDifficulty}
          className="border rounded-lg p-2"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.difficulty && (
          <p className="text-sm text-red-500">{errors.difficulty}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          name="goal"
          value={form.goal}
          onChange={handleText}
          className="border rounded-lg p-2"
          rows={4}
          placeholder="Goal"
        />
        {errors.goal && <p className="text-sm text-red-500">{errors.goal}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <select
          value={form.targetPerWeek}
          onChange={handleTarget}
          className="border rounded-lg p-2"
        >
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
        </select>
        {errors.targetPerWeek && (
          <p className="text-sm text-red-500">{errors.targetPerWeek}</p>
        )}
      </div>

      <button type="submit" className="rounded border px-3 py-2">
        Save
      </button>
    </form>
  );
};
export default ExerciseForm;
