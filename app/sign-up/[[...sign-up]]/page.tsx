"use client";

import { useActionState, useState } from "react";
import TeacherForm from "./components/TeacherForm";
import StudentForm from "./components/StudentForm";
import VerifyEmail from "./components/VerifyEmail";
import {
  TeacherFormFields,
  validateTeacherAction,
} from "../actions/validateForms";

export type RoleType = "teacher" | "student";

const SingUpPage = () => {
  const [role, setRole] = useState<RoleType | undefined>(undefined);
  const [verifying, setVerifying] = useState(false);
  const [state, formAction, isPending] = useActionState(
    validateTeacherAction,
    {}
  );
  const [pendingFields, setPendingFields] = useState<TeacherFormFields | null>(
    null
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {verifying ? (
        <VerifyEmail
          onVerified={() => setVerifying(false)}
          fields={pendingFields}
        />
      ) : role === "teacher" ? (
        <TeacherForm
          setVerifying={setVerifying}
          role={role}
          setPendingFields={setPendingFields}
          state={state}
          formAction={formAction}
          isPending={isPending}
        />
      ) : role === "student" ? (
        <StudentForm setVerifying={setVerifying} role={role} />
      ) : null}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setRole("teacher")}
          className={
            role === "teacher" ? "bg-blue-600 text-white p-2" : "border p-2"
          }
        >
          Register as Teacher
        </button>
        <button
          onClick={() => setRole("student")}
          className={
            role === "student" ? "bg-blue-600 text-white p-2" : "border p-2"
          }
        >
          Register as Student
        </button>
      </div>
    </div>
  );
};

export default SingUpPage;
