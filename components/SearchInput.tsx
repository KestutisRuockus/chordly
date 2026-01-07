"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSearch = async () => {
    const params = new URLSearchParams(searchParams.toString());

    if (!query.trim()) {
      params.delete("q");
    } else {
      params.set("q", query.trim());
    }

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="border px-2"
        placeholder="Enter name..."
      />
      <button onClick={handleSearch} className="border px-2">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
