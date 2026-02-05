"use client";

import { useActionState, useState } from "react";
import TeacherForm from "./components/TeacherForm";
import StudentForm from "./components/StudentForm";
import VerifyEmail from "./components/VerifyEmail";
import {
  StudentFormFields,
  TeacherFormFields,
  validateStudentAction,
  validateTeacherAction,
} from "../actions/validateForms";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth } from "@/content/auth";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { RoleType } from "@/types/role";

const SingUpPage = () => {
  const [role, setRole] = useState<RoleType | undefined>(undefined);
  const [verifying, setVerifying] = useState(false);
  const [teacherState, teacherAction, teacherPending] = useActionState(
    validateTeacherAction,
    {},
  );

  const [studentState, studentAction, studentPending] = useActionState(
    validateStudentAction,
    {},
  );

  const [pendingFields, setPendingFields] = useState<
    TeacherFormFields | StudentFormFields | null
  >(null);

  return (
    <Main>
      <HeaderSection {...auth.registration} />
      <Section>
        {verifying && pendingFields ? (
          <VerifyEmail
            onVerified={() => setVerifying(false)}
            fields={pendingFields}
            role={role!}
          />
        ) : role === "teacher" ? (
          <TeacherForm
            setVerifying={setVerifying}
            role={role}
            setPendingFields={setPendingFields}
            state={teacherState}
            formAction={teacherAction}
            isPending={teacherPending}
          />
        ) : role === "student" ? (
          <StudentForm
            setVerifying={setVerifying}
            role={role}
            setPendingFields={setPendingFields}
            state={studentState}
            formAction={studentAction}
            isPending={studentPending}
          />
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
      </Section>
    </Main>
  );
};

export default SingUpPage;
