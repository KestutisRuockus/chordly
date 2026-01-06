"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSearch = async () => {
    if (!query.trim()) {
      router.push("find-teachers");
      return;
    }

    router.push(`/find-teachers?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <div className="flex">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="border px-2"
        placeholder="Search..."
      />
      <button onClick={handleSearch} className="border px-2">
        Search
      </button>
    </div>
  );
};

export default SearchInput;
