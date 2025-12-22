"use client";

import { useSignUp } from "@clerk/nextjs";
import { useActionState, useEffect, useState } from "react";
import { LessonType, validateStudentAction } from "../../actions";
import Link from "next/link";
import type { ClerkAPIResponseError } from "@clerk/shared";
import { RoleType } from "../page";

const StudentForm = ({
  setVerifying,
  role,
}: {
  setVerifying: (v: boolean) => void;
  role: RoleType | undefined;
}) => {
  const { signUp, isLoaded } = useSignUp();
  const [state, formAction, isPending] = useActionState(
    validateStudentAction,
    {}
  );

  const [lessonType, setLessonType] = useState<LessonType>("hybrid");

  useEffect(() => {
    if (!state.success || !state.fields || !isLoaded) return;

    const studentPayload = {
      ...state.fields,
      role: role,
    };

    console.log("STUDENT OBJECT (DB later):", studentPayload);

    const createClerkUser = async () => {
      if (!state.success || !state.fields || !isLoaded) return;

      try {
        await signUp.create({
          emailAddress: state.fields!.email,
          password: state.fields!.password,
          firstName: state.fields!.fullName.split(" ")[0],
          lastName: state.fields!.fullName.split(" ").slice(1).join(" "),
          unsafeMetadata: {
            role: role,
          },
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setVerifying(true);
      } catch (err) {
        if ((err as ClerkAPIResponseError).errors) {
          const clerkError = err as ClerkAPIResponseError;
          console.error("Clerk signup error:", clerkError.errors[0]?.message);
        } else {
          console.error("Unknown signup error:", err);
        }
      }
    };

    createClerkUser();
  }, [state.success, state.fields, isLoaded, signUp, setVerifying, role]);

  return (
    <form action={formAction} className="flex flex-col gap-3 w-96">
      <h2>Register as Student</h2>

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

      <p>Preferred Lesson type:</p>
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

      <p>Skill level:</p>
      <select
        name="skillLevel"
        className="border"
        defaultValue={state.fields?.skillLevel ?? ""}
      >
        <option value="">Select skill level (optional)</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <textarea
        name="bio"
        placeholder="Short bio"
        className="border"
        defaultValue={state.fields?.bio ?? ""}
      />

      <input
        name="age"
        type="number"
        placeholder="Age (optional)"
        className="border"
        defaultValue={state.fields?.age ?? ""}
      />

      {/* Profile photo placeholder */}
      <input type="file" disabled className="border" />

      {state.error && <p className="text-red-500">{state.error}</p>}

      <button disabled={isPending} className="border">
        {isPending ? "Creating..." : "Create Account"}
      </button>

      <Link href="/sign-in" className="text-sm underline">
        Already have an account? Sign in
      </Link>
    </form>
  );
};

export default StudentForm;
