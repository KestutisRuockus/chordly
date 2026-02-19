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

    params.delete("limit");
    router.push(`${pathName}?${params.toString()}`);
    setQuery("");
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("q");
    params.delete("instruments");
    params.delete("limit");

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex rounded-md w-full">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="border bg-input text-sm text-foreground outline-ring px-2 rounded-l-md w-32"
          placeholder="Enter name..."
        />
        <button
          onClick={handleSearch}
          className="border bg-primary text-primary-foreground hover:bg-primary/70 transition-colors duration-300 rounded-r-md px-4"
        >
          Search
        </button>
      </div>
      <button
        onClick={clearAllFilters}
        className="w-fit border bg-secondary text-xs text-secondary-foreground hover:bg-secondary/70 transition-colors duration-300 px-4 rounded-md"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default SearchInput;
