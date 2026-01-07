"use client";

import { useRouter } from "next/navigation";

type Props = {
  text: string;
};

const BackButton = ({ text }: Props) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="border px-4 w-fit">
      {text}
    </button>
  );
};

export default BackButton;
