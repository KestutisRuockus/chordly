"use client";

import type { RoleType } from "@/types/role";
import {
  ValidateCreateUserFields,
  ValidateCreateUserState,
  validateCreateUserAction,
} from "@/app/actions/validateCreateUser";
import CreateUserForm from "./CreateUserForm";
import VerifyEmail from "./VerifyEmail";
import { useState } from "react";
import Section from "@/components/layout/Section";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
      <Section className="max-w-sm">
        <p>Select a role to register:</p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setRole("teacher")}
            className="bg-background border-2 border-primary rounded-md hover:bg-muted-foreground/70 transition-colors duration-300 text-foreground p-2"
          >
            Register as Teacher
          </button>
          <button
            onClick={() => setRole("student")}
            className="bg-background border-2 border-primary rounded-md hover:bg-muted-foreground/70 transition-colors duration-300 text-foreground p-2"
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
    <Section className="max-w-sm">
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
          className={cn(
            "p-2 rounded-md transition-colors duration-300",
            role === "teacher"
              ? "bg-primary text-primary-foreground hover:bg-primary/70"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
          )}
        >
          Register as Teacher
        </button>
        <button
          onClick={() => setRole("student")}
          className={cn(
            "p-2 rounded-md transition-colors duration-300",
            role === "student"
              ? "bg-primary text-primary-foreground hover:bg-primary/70"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
          )}
        >
          Register as Student
        </button>
      </div>
    </Section>
  );
}
