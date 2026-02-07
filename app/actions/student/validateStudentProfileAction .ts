"use server";

export type StudentEditProfileFields = {
  location: string;
  skillLevel: string;
  bio: string;
  age?: number;
  avatarUrl?: string;
};

export type StudentProfileState = {
  error?: string;
  success?: boolean;
  fields?: StudentEditProfileFields;
};

export const validateStudentProfileAction = async (
  _: StudentProfileState,
  formData: FormData,
): Promise<StudentProfileState> => {
  const fields: StudentEditProfileFields = {
    location: ((formData.get("location") as string) || "").trim(),
    skillLevel: ((formData.get("skillLevel") as string) || "").trim(),
    bio: ((formData.get("bio") as string) || "").trim(),
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    avatarUrl: (formData.get("avatarUrl") as string) || undefined,
  };

  if (!fields.location || fields.location.length < 2) {
    return { error: "Location is required.", fields };
  }

  if (!fields.skillLevel) {
    return { error: "Skill level is required.", fields };
  }

  if (!fields.bio || fields.bio.length < 10) {
    return { error: "Bio must be at least 10 characters.", fields };
  }

  if (fields.age && (fields.age < 1 || fields.age > 120)) {
    return { error: "Please enter a valid age.", fields };
  }

  return { success: true, fields };
};
