"use client";

import { useState } from "react";
import { updateTeacherPlanAction } from "@/app/actions/teacher/teacherPlanActions";
import { TeacherPlan } from "@/db/types";
import { toast } from "sonner";
import Modal from "../ui/Modal";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  plan: TeacherPlan;
  onSubmit?: () => void;
  teacherId: string;
  disabled: boolean;
};

const PlanUpdate = ({ label, plan, teacherId, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await updateTeacherPlanAction(teacherId, plan);
      toast.success("Plan updated successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "border rounded-md px-4 transition-colors duration-300",
          disabled
            ? "opacity-50"
            : "cursor-pointer hover:bg-primary hover:text-primary-foreground",
        )}
        disabled={disabled}
      >
        {label}
      </button>
      {isOpen && (
        <Modal
          title={`Plan will be changed to ${label}?`}
          onClose={() => setIsOpen(false)}
        >
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              className="border px-4 rounded-md cursor-pointer bg-primary text-primary-foreground hover:bg-primary/70 transition-colors duration-300"
            >
              {isSubmitting ? "Updating..." : "Confirm"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="border px-4 rounded-md cursor-pointer bg-destructive/50 text-foreground hover:bg-destructive/80 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PlanUpdate;
