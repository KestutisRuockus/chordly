"use client";

type Props = {
  items: InstrumentGroup[];
};

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Section from "./layout/Section";
import { InstrumentGroup } from "@/types/content";

const InstrumentsFilter = ({ items }: Props) => {
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

    params.delete("limit");
    router.replace(`${pathName}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("q");
    params.delete("instruments");
    params.delete("limit");

    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Section>
      <h3 className="font-medium">Filter by instruments</h3>

      <div className="flex flex-col gap-4">
        {items.map((group) => (
          <div key={group.instrumentType}>
            <h4 className="font-medium">{group.instrumentType}</h4>

            <div className="flex flex-wrap gap-4">
              {group.instruments?.map((instrument) => (
                <label key={instrument} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.has(instrument)}
                    onChange={() => toggleInstrument(instrument)}
                  />
                  {instrument}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={clearAllFilters} className="border px-4 mt-4">
        Clear all filters
      </button>
    </Section>
  );
};

export default InstrumentsFilter;
