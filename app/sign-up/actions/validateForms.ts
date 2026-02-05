"use server";

export type LessonType = "online" | "in-person" | "hybrid";
export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type TeacherFormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  instruments: string[];
  lessonType: LessonType;
  location?: string;
  bio: string;
  experience?: string;
  hourlyRate: string;
  avatarUrl?: string | null;
};
export type StudentFormFields = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  lessonType: LessonType;
  location?: string;
  bio?: string;
  avatarUrl?: string | null;
  age?: number;
  skillLevel: string;
};

export type TeacherFormState = {
  error?: string;
  success?: boolean;
  fields?: TeacherFormFields;
};

export type StudentFormState = {
  error?: string;
  success?: boolean;
  fields?: StudentFormFields;
};

export const validateTeacherAction = async (
  _: TeacherFormState,
  formData: FormData,
): Promise<TeacherFormState> => {
  const instruments = formData.getAll("instruments") as string[];

  const fields: TeacherFormFields = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    instruments,
    lessonType: formData.get("lessonType") as LessonType,
    location: (formData.get("location") as string) || "",
    bio: (formData.get("bio") as string) || "",
    experience: (formData.get("experience") as string) || "",
    hourlyRate: (formData.get("hourlyRate") as string) || "",
    avatarUrl: null,
  };

  if (!fields.fullName || fields.fullName.trim().length < 2) {
    return { error: "Full name is required.", fields };
  }

  if (!fields.email || !fields.email.includes("@")) {
    return { error: "Valid email required.", fields };
  }

  if (fields.password.length < 8) {
    return { error: "Password must be at least 8 characters.", fields };
  }

  if (fields.password !== fields.confirmPassword) {
    return { error: "Passwords do not match.", fields };
  }

  if (!fields.instruments.length) {
    return { error: "Select at least one instrument.", fields };
  }

  if (
    (fields.lessonType === "in-person" || fields.lessonType === "hybrid") &&
    !fields.location
  ) {
    return { error: "Location is required for this lesson type.", fields };
  }

  if (!fields.bio || fields.bio.trim().length < 10) {
    return {
      error: "Bio must be at least 10 characters long.",
      fields,
    };
  }

  if (!fields.hourlyRate) {
    return {
      error: "Hourly rate is required.",
      fields,
    };
  }

  const rate = Number(fields.hourlyRate);

  if (Number.isNaN(rate) || rate <= 0) {
    return {
      error: "Hourly rate must be a positive number.",
      fields,
    };
  }

  return { success: true, fields };
};

export const validateStudentAction = async (
  _: StudentFormState,
  formData: FormData,
): Promise<StudentFormState> => {
  const fields: StudentFormFields = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    lessonType: formData.get("lessonType") as LessonType,
    location: (formData.get("location") as string) || "",
    bio: (formData.get("bio") as string) || "",
    avatarUrl: null,
    skillLevel: formData.get("skillLevel") as string,
  };

  if (!fields.fullName || fields.fullName.trim().length < 2) {
    return { error: "Full name is required.", fields };
  }

  if (!fields.email || !fields.email.includes("@")) {
    return { error: "Valid email required.", fields };
  }

  if (fields.password.length < 8) {
    return { error: "Password must be at least 8 characters.", fields };
  }

  if (fields.password !== fields.confirmPassword) {
    return { error: "Passwords do not match.", fields };
  }

  if (
    (fields.lessonType === "in-person" || fields.lessonType === "hybrid") &&
    !fields.location
  ) {
    return { error: "Location is required for this lesson type.", fields };
  }

  if (fields.skillLevel.trim() === "") {
    return {
      error: "Skill Level is not selected. Please select your skill level.",
      fields,
    };
  }

  return { success: true, fields };
};
