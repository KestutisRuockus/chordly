"use client";

import { useState } from "react";
import Modal from "../ui/Modal";
import DeactivateConfirmWindow from "./DeactivateConfirmWindow";
import { deactivateStudentAction } from "@/app/actions/teacher/DeactivateStudentAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  teacherId: string;
  studentId: string;
  disabled: boolean;
};

const DeactivateStudent = ({ teacherId, studentId, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    let success = false;
    setIsSubmitting(true);
    try {
      await deactivateStudentAction(teacherId, studentId);
      toast.success("Student deactivated successfully");
      success = true;
      router.push("/dashboard/teacher");
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      if (success) {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`w-full text-sm rounded-md bg-red-300 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={disabled}
      >
        Deactivate student
      </button>
      {isOpen && (
        <Modal title={"Deactivate student"} onClose={() => setIsOpen(false)}>
          <DeactivateConfirmWindow
            onSubmit={handleSubmit}
            onClose={() => setIsOpen(false)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </>
  );
};

export default DeactivateStudent;
