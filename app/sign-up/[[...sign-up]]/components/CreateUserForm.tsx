"use client";

import type { RoleType } from "@/types/role";
import type {
  ValidateCreateUserFields,
  ValidateCreateUserState,
} from "@/app/actions/validateCreateUser";
import { useState } from "react";

type Props = {
  role: RoleType;
  onSuccess: (fields: ValidateCreateUserFields) => void;
  formAction: (
    state: ValidateCreateUserState,
    formData: FormData,
  ) => Promise<ValidateCreateUserState>;
  state: ValidateCreateUserState;
  isPending: boolean;
};

const CreateUserForm = ({
  role,
  onSuccess,
  formAction,
  state,
  isPending,
}: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("fullName", fullName);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    const result = await formAction({}, formData);
    if (result.success && result.fields) {
      onSuccess({ ...result.fields, role });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2"
        required
      />

      {state.error && <p className="text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white p-2"
      >
        {isPending ? "Submitting..." : `Register as ${role}`}
      </button>
    </form>
  );
};

export default CreateUserForm;
