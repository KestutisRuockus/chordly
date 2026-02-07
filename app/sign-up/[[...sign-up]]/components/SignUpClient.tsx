"use client";

import {
  ValidateCreateUserFields,
  ValidateCreateUserState,
  validateCreateUserAction,
} from "@/app/actions/validateCreateUser";
import { RoleType } from "@/types/role";
import CreateUserForm from "./CreateUserForm";
import VerifyEmail from "./VerifyEmail";
import { useState } from "react";
import Section from "@/components/layout/Section";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";

export default function SignUpClient() {
  const [role, setRole] = useState<RoleType | undefined>(undefined);
  const [verifying, setVerifying] = useState(false);
  const [pendingFields, setPendingFields] =
    useState<ValidateCreateUserFields | null>(null);
  const [isVerifying, setisVerifying] = useState(false);

  const { signUp, isLoaded } = useSignUp();

  const handleFormAction = async (
    _state: ValidateCreateUserState,
    formData: FormData,
  ): Promise<ValidateCreateUserState> => {
    if (!role) return { error: "Select a role first" };
    if (!formData) return { error: "FormData missing" };
    return await validateCreateUserAction({}, formData, role);
  };

  const handleSuccess = async (fields: ValidateCreateUserFields) => {
    if (!isLoaded || !signUp) {
      return;
    }

    try {
      setisVerifying(true);

      await signUp.create({
        emailAddress: fields.email,
        password: fields.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingFields(fields);
      setVerifying(true);
    } catch (err) {
      console.error("Failed to start sign-up", err);
      toast.error("Failed to start registration. Try again.");
    } finally {
      setisVerifying(false);
    }
  };

  if (!role) {
    return (
      <Section>
        <p>Select a role to register:</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setRole("teacher")}
            className="bg-blue-600 text-white p-2"
          >
            Register as Teacher
          </button>
          <button
            onClick={() => setRole("student")}
            className="bg-blue-600 text-white p-2"
          >
            Register as Student
          </button>
        </div>
      </Section>
    );
  }

  if (verifying && pendingFields) {
    return (
      <VerifyEmail
        role={role}
        fields={pendingFields}
        onVerified={() => setVerifying(false)}
      />
    );
  }

  return (
    <Section>
      <CreateUserForm
        role={role}
        formAction={handleFormAction}
        state={{}}
        isPending={isVerifying}
        onSuccess={handleSuccess}
      />

      <p className="mt-4">Or switch role:</p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setRole("teacher")}
          className="bg-blue-600 text-white p-2"
        >
          Register as Teacher
        </button>
        <button
          onClick={() => setRole("student")}
          className="bg-blue-600 text-white p-2"
        >
          Register as Student
        </button>
      </div>
    </Section>
  );
}
