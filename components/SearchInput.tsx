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

  return (
    <Section className="flex">
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
    </Section>
  );
};

export default SearchInput;
