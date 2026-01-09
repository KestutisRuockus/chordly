"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  step?: number;
};

const LoadMoreButton = ({ step = 5 }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentLimit = Number(searchParams.get("limit")) || step;

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("limit", String(currentLimit + step));
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <button onClick={handleLoadMore} className="border px-4 mt-6">
      Load More
    </button>
  );
};

export default LoadMoreButton;
