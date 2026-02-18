import noAvatar from "@/public/noAvatar.jpg";
import Image from "next/image";

type Props = {
  avatarUrl: string | null;
  fullName: string;
  size?: number;
};

const ProfileAvatar = ({ avatarUrl, fullName, size = 220 }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <span className="text-lg font-semibold">{fullName.split(" ")[0]}</span>
      <Image
        src={avatarUrl ? avatarUrl : noAvatar}
        alt={fullName ?? "User avatar"}
        width={size}
        height={size}
        className="rounded-full"
      />
    </div>
  );
};

export default ProfileAvatar;
