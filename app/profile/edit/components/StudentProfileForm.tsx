"use client";

import type { StudentRow } from "@/db/types";
import ProfileImagePicker from "@/components/ProfileImagePicker";
import { useCallback, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";

type Props = {
  initialData: StudentRow;
  formAction: (formData: FormData) => void | Promise<void>;
  isPending: boolean;
  error?: string;
};

const StudentProfileForm = ({
  initialData,
  formAction,
  isPending,
  error,
}: Props) => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { startUpload } = useUploadThing("profileImage");

  const uploadProfileAvatar = useCallback(async () => {
    if (!profileImage) return null;

    const res = await startUpload([profileImage]);
    if (!res || !res[0]) return null;

    return res[0].serverData.url;
  }, [profileImage, startUpload]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const avatarUrl = await uploadProfileAvatar();
    if (avatarUrl) {
      formData.append("avatarUrl", avatarUrl);
    } else if (initialData.avatarUrl) {
      formData.append("avatarUrl", initialData.avatarUrl);
    }

    await formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-96">
      <h3 className="text-3xl my-4 text-center">Edit Student Profile</h3>

      <label>
        Location<span className="text-red-500">*</span>
      </label>
      <input
        name="location"
        placeholder="Location"
        className="border p-2"
        defaultValue={initialData.location ?? ""}
      />

      <label>
        Skill level<span className="text-red-500">*</span>
      </label>
      <select
        name="skillLevel"
        className="border p-2"
        defaultValue={initialData.skillLevel ?? ""}
      >
        <option value="">Select skill level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <label>
        Bio<span className="text-red-500">*</span>
      </label>
      <textarea
        name="bio"
        placeholder="Tell us about yourself"
        className="border p-2"
        defaultValue={initialData.bio ?? ""}
        rows={4}
      />

      <label>Age (optional)</label>
      <input
        name="age"
        type="number"
        placeholder="Age"
        className="border p-2"
        defaultValue={initialData.age ?? ""}
      />

      <ProfileImagePicker
        value={profileImage}
        onChange={setProfileImage}
        currentImageUrl={initialData.avatarUrl ?? undefined}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="border p-2 bg-blue-600 text-white disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default StudentProfileForm;
