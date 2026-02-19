"use client";

import type { StudentRow } from "@/db/types";
import ProfileImagePicker from "@/components/ProfileImagePicker";
import { useProfileAvatarUpload } from "@/hooks/useProfileAvatarUpload/useProfileAvatarUpload";
import Heading from "@/components/ui/Heading";

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
  const { profileImage, setProfileImage, uploadProfileAvatar } =
    useProfileAvatarUpload();

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <Heading heading="Edit Student Profile" />

      <div className="flex flex-col gap-2 w-full md:w-3/5 2xl:w-2/3 mx-auto">
        <label>
          Location<span className="text-red-500">*</span>
        </label>
        <input
          name="location"
          placeholder="Location"
          className="border p-2 outline-ring"
          defaultValue={initialData.location ?? ""}
        />

        <label>
          Skill level<span className="text-red-500">*</span>
        </label>
        <select
          name="skillLevel"
          className="border p-2 outline-ring"
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
          className="border p-2 outline-ring"
          defaultValue={initialData.bio ?? ""}
          rows={4}
        />

        <label>Age (optional)</label>
        <input
          name="age"
          type="number"
          placeholder="Age"
          className="border p-2 outline-ring"
          defaultValue={initialData.age ?? ""}
        />
      </div>

      <ProfileImagePicker
        value={profileImage}
        onChange={setProfileImage}
        currentImageUrl={initialData.avatarUrl ?? undefined}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="border p-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 hover:bg-primary/70 max-w-80 mx-auto"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default StudentProfileForm;
