"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InstrumentGroup } from "@/types/content";
import SubHeading from "./ui/SubHeading";
import { cn } from "@/lib/utils";

type Props = {
  items: InstrumentGroup[];
};

const InstrumentsFilter = ({ items }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const selected = new Set(
    (searchParams.get("instruments") ?? "").split(",").filter(Boolean),
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

  return (
    <div className="w-full overflow-hidden">
      <SubHeading subHeading="Filter by instruments" textCentered={false} />
      <div className="flex md:flex-col overflow-x-auto gap-4 mt-2">
        {items.map((group) => (
          <div
            key={group.instrumentType}
            className="border p-4 rounded-md bg-card"
          >
            <h4 className="font-medium text-base text-muted-foreground max-md:text-nowrap">
              {group.instrumentType}
            </h4>

            <div className="flex flex-col">
              {group.instruments?.map((instrument) => {
                const isSelected = selected.has(instrument);
                return (
                  <label
                    key={instrument}
                    className={cn(
                      "flex items-center text-sm gap-2 text-nowrap",
                      isSelected
                        ? "text-primary font-medium"
                        : "text-foreground",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleInstrument(instrument)}
                      className="accent-primary"
                    />
                    {instrument}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstrumentsFilter;
