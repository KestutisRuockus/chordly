"use client";

import Image, { StaticImageData } from "next/image";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  currentImageUrl?: string | StaticImageData | null;
};

const ProfileImagePicker = ({ value, onChange, currentImageUrl }: Props) => {
  const preview = value ? URL.createObjectURL(value) : null;
  const displayImage = preview || currentImageUrl;

  return (
    <div className="flex flex-col gap-2 my-4 p-4 border rounded-md w-full md:w-3/5 xl:w-2/3 mx-auto bg-card">
      <label className="text-sm font-medium mx-auto">
        Profile photo (optional)
      </label>

      <div className="h-30 w-30 rounded-md border flex items-center justify-center overflow-hidden mx-auto">
        {displayImage ? (
          <Image
            src={displayImage}
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
        className="mx-auto max-sm:w-full"
      />
    </div>
  );
};

export default ProfileImagePicker;
