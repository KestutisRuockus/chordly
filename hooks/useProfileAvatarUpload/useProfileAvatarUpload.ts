"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { useCallback, useState } from "react";

export const useProfileAvatarUpload = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { startUpload } = useUploadThing("profileImage");

  const uploadProfileAvatar = useCallback(async () => {
    if (!profileImage) return null;

    const res = await startUpload([profileImage]);
    if (!res || !res[0]) return null;

    return res[0].serverData.url;
  }, [profileImage, startUpload]);

  return {
    profileImage,
    setProfileImage,
    uploadProfileAvatar,
  };
};
