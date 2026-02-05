"use client";

import Image from "next/image";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
};

const ProfileImagePicker = ({ value, onChange }: Props) => {
  const preview = value ? URL.createObjectURL(value) : null;

  return (
    <div className="flex flex-col gap-2 my-4 p-4 border rounded-md">
      <label className="text-sm font-medium">Profile photo</label>

      <div className="h-30 w-30 rounded-md border flex items-center justify-center overflow-hidden mx-auto">
        {preview ? (
          <Image
            src={preview}
            alt="Profile preview"
            width={80}
            height={80}
            className="object-cover"
          />
        ) : (
          <span className="text-xs opacity-60">No image</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          onChange(e.currentTarget.files?.[0] ?? null);
        }}
      />
    </div>
  );
};

export default ProfileImagePicker;
