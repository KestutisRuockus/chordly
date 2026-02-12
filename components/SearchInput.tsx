"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Section from "./layout/Section";

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
    <Section className="flex">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className="border px-2"
        placeholder="Enter name..."
      />
      <button onClick={handleSearch} className="border px-4">
        Search
      </button>
      <button onClick={clearAllFilters} className="border px-4 ml-4">
        Clear all filters
      </button>
    </Section>
  );
};

export default SearchInput;
