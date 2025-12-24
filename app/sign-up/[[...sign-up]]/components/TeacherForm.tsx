"use client";

import { useSignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  LessonType,
  TeacherFormFields,
  TeacherFormState,
} from "../../actions/validateForms";
import Link from "next/link";
import type { ClerkAPIResponseError } from "@clerk/shared";

type Props = {
  role: "teacher";
  setVerifying: (v: boolean) => void;
  setPendingFields: (f: TeacherFormFields) => void;
  state: TeacherFormState;
  formAction: (formData: FormData) => void | Promise<void>;
  isPending: boolean;
};

const instrumentsList = ["Piano", "Guitar", "Violin", "Other"];

const TeacherForm = ({
  role,
  setVerifying,
  setPendingFields,
  state,
  formAction,
  isPending,
}: Props) => {
  const { signUp, isLoaded } = useSignUp();
  const [lessonType, setLessonType] = useState<LessonType>("hybrid");
  const [clerkError, setClerkError] = useState<string | null>(null);

  useEffect(() => {
    const createClerkUser = async () => {
      if (!state.fields || !isLoaded) return;
      try {
        await signUp.create({
          emailAddress: state.fields.email,
          password: state.fields.password,
          firstName: state.fields.fullName.split(" ")[0],
          lastName: state.fields.fullName.split(" ").slice(1).join(" "),
          unsafeMetadata: { role },
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setPendingFields(state.fields);
        setVerifying(true);
      } catch (err) {
        const clerkErr = err as ClerkAPIResponseError;
        if (clerkErr.errors?.[0]?.code === "form_identifier_exists") {
          setClerkError("An account with this email already exists.");
          return;
        }
      }
    };

    createClerkUser();
  }, [
    isLoaded,
    role,
    setPendingFields,
    setVerifying,
    signUp,
    state.fields,
    state.success,
  ]);

  return (
    <form action={formAction} className="flex flex-col gap-3 w-96">
      <h2>Register as Teacher</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        required
        className="border"
        defaultValue={state.fields?.fullName ?? ""}
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        className="border"
        defaultValue={state.fields?.email ?? ""}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border"
        defaultValue={state.fields?.password ?? ""}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
        className="border"
        defaultValue={state.fields?.confirmPassword ?? ""}
      />

      <div>
        <p>Instruments you teach:</p>
        <div className="flex gap-4">
          {instrumentsList.map((i) => (
            <label key={i} className="flex gap-2">
              <input
                type="checkbox"
                name="instruments"
                value={i}
                defaultChecked={state.fields?.instruments?.includes(i)}
              />
              {i}
            </label>
          ))}
        </div>
      </div>

      <p>Lesson type:</p>
      <div className="flex gap-4">
        {["online", "in-person", "hybrid"].map((type) => (
          <label key={type}>
            <input
              type="radio"
              name="lessonType"
              value={type}
              defaultChecked={(state.fields?.lessonType ?? "hybrid") === type}
              onChange={() => setLessonType(type as LessonType)}
            />
            {type}
          </label>
        ))}
      </div>

      {(lessonType === "in-person" || lessonType === "hybrid") && (
        <input
          name="location"
          placeholder="Location"
          required
          className="border"
          defaultValue={state.fields?.location ?? ""}
        />
      )}

      <textarea
        name="bio"
        placeholder="Short bio"
        className="border"
        defaultValue={state.fields?.bio ?? ""}
      />

      <select
        name="experience"
        className="border"
        defaultValue={state.fields?.experience ?? ""}
      >
        <option value="">Teaching experience</option>
        <option value="0-1">0-1 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
        <option value="5+">5+ years</option>
      </select>

      <input
        name="hourlyRate"
        type="number"
        placeholder="Hourly rate (€)"
        className="border"
        defaultValue={state.fields?.hourlyRate ?? ""}
      />

      {/* Profile photo placeholder */}
      <input type="file" disabled className="border" />

      {state.error && <p className="text-red-500">{state.error}</p>}
      {clerkError && <p className="text-red-500">{clerkError}</p>}

      <button disabled={isPending} className="border">
        {isPending ? "Creating..." : "Create Account"}
      </button>

      <Link href="/sign-in" className="text-sm underline">
        Already have an account? Sign in
      </Link>
    </form>
  );
};

export default TeacherForm;
