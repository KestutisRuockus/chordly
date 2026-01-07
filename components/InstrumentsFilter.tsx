"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const INSTRUMENTS = ["Piano", "Guitar", "Violin", "Other"];

const InstrumentsFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selected = new Set(
    (searchParams.get("instruments") ?? "").split(",").filter(Boolean)
  );

  const toggleInstrument = (instrument: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selected.has(instrument)) {
      selected.delete(instrument);
    } else {
      selected.add(instrument);
    }

    const next = Array.from(selected);

    if (next.length === 0) {
      params.delete("instruments");
    } else {
      params.set("instruments", next.join(","));
    }

    router.replace(`${pathName}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("q");
    params.delete("instruments");

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <h3 className="font-medium">Filter by Instruments:</h3>
      <div className="flex gap-4">
        {INSTRUMENTS.map((instrument) => (
          <label key={instrument} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.has(instrument)}
              onChange={() => toggleInstrument(instrument)}
            />
            {instrument}
          </label>
        ))}
        <button onClick={clearAllFilters} className="border px-4">
          Clear All Filters
        </button>
      </div>
    </>
  );
};

export default InstrumentsFilter;
