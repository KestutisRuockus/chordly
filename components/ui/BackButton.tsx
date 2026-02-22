"use client";

import { useRouter } from "next/navigation";

type Props = {
  text: string;
};

const BackButton = ({ text }: Props) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="border px-4 rounded-md w-fit bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default BackButton;
