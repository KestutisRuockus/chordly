"use client";

import type { StudentRow, TeacherRow } from "@/db/types";
import type { RoleType } from "@/types/role";
import { useState } from "react";
import StudentProfileForm from "./StudentProfileForm";
import TeacherProfileForm from "./TeacherProfileForm";
import { toast } from "sonner";
import Section from "@/components/layout/Section";
import { validateStudentProfileAction } from "@/app/actions/student/validateStudentProfileAction ";
import { updateStudentProfileAction } from "@/app/actions/student/updateStudentProfileAction";
import { validateTeacherProfileAction } from "@/app/actions/teacher/validateTeacherProfileAction";
import { updateTeacherProfileAction } from "@/app/actions/teacher/updateTeachertProfileAction";

type Props = {
  role: RoleType;
  initialData: StudentRow | TeacherRow;
};

const ProfileEditClient = ({ role, initialData }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormAction = async (formData: FormData) => {
    setIsPending(true);
    setError(null);

    try {
      if (role === "student") {
        const result = await validateStudentProfileAction({}, formData);

        if (!result.success || !result.fields) {
          setError(result.error ?? "Validation failed");
          return;
        }
        await updateStudentProfileAction(result.fields);
      } else {
        const result = await validateTeacherProfileAction({}, formData);

        if (!result.success || !result.fields) {
          setError(result.error ?? "Validation failed");
          return;
        }

        await updateTeacherProfileAction(result.fields);
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  if (role === "student") {
    return (
      <Section className="w-full lg:w-4/5 2xl:w-3/5">
        <StudentProfileForm
          initialData={initialData as StudentRow}
          formAction={handleFormAction}
          isPending={isPending}
          error={error ?? undefined}
        />
      </Section>
    );
  }

  return (
    <Section className="w-full lg:w-4/5 2xl:w-3/5">
      <TeacherProfileForm
        initialData={initialData as TeacherRow}
        formAction={handleFormAction}
        isPending={isPending}
        error={error ?? undefined}
      />
    </Section>
  );
};

export default ProfileEditClient;
