"use server";

export type UserRole = "student" | "teacher";

export type ValidateCreateUserFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
};

export type ValidateCreateUserState = {
  error?: string;
  success?: boolean;
  fields?: ValidateCreateUserFields;
};

export const validateCreateUserAction = async (
  _: ValidateCreateUserState,
  formData: FormData,
  role: UserRole,
): Promise<ValidateCreateUserState> => {
  const fields: ValidateCreateUserFields = {
    fullName: ((formData.get("fullName") as string) || "").trim(),
    email: ((formData.get("email") as string) || "").trim(),
    password: ((formData.get("password") as string) || "").trim(),
    confirmPassword: ((formData.get("confirmPassword") as string) || "").trim(),
    role,
  };

  if (!fields.fullName || fields.fullName.length < 2) {
    return { error: "Full name is required.", fields };
  }

  if (!fields.email || !fields.email.includes("@")) {
    return { error: "Valid email required.", fields };
  }

  if (!fields.password || fields.password.length < 8) {
    return { error: "Password must be at least 8 characters.", fields };
  }

  if (fields.password !== fields.confirmPassword) {
    return { error: "Passwords do not match.", fields };
  }

  return { success: true, fields };
};
