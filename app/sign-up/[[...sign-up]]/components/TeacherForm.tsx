"use client";

import { useSignUp } from "@clerk/nextjs";
import { useActionState, useEffect, useState } from "react";
import { LessonType, validateTeacherAction } from "../../actions";
import Link from "next/link";
import type { ClerkAPIResponseError } from "@clerk/shared";
import { RoleType } from "../page";

const instrumentsList = ["Piano", "Guitar", "Violin", "Other"];

const TeacherForm = ({
  setVerifying,
  role,
}: {
  setVerifying: (v: boolean) => void;
  role: RoleType | undefined;
}) => {
  const { signUp, isLoaded } = useSignUp();
  const [state, formAction, isPending] = useActionState(
    validateTeacherAction,
    {}
  );

  const [lessonType, setLessonType] = useState<LessonType>("hybrid");

  useEffect(() => {
    if (!state.success || !state.fields || !isLoaded) return;

    const teacherPayload = {
      ...state.fields,
      role: role,
    };

    console.log("TEACHER OBJECT (DB later):", teacherPayload);

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
