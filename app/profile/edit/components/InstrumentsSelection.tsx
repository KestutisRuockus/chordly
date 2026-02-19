"use client";

import SubHeading from "@/components/ui/SubHeading";
import { INSTRUMENTS_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  defaultSelected?: string[];
};

const InstrumentsSelection = ({ defaultSelected = [] }: Props) => {
  return (
    <article className="flex flex-col border rounded-md p-4 w-full sm:w-2/5 2xl:w-1/3">
      <SubHeading
        subHeading="Select instruments you teach:"
        textCentered={false}
      />
      <div className="flex flex-wrap justify-center sm:flex-col gap-2">
        {INSTRUMENTS_LIST.items.map((category) => (
          <div
            key={category.instrumentType}
            className="bg-surface rounded-md p-2 max-sm:w-36 max-[400px]:w-full"
          >
            <h4 className="font-medium text-sm mt-1">
              {category.instrumentType}
            </h4>
            <div className="flex flex-col">
              {category.instruments.map((instrument) => {
                const isSelected = defaultSelected.includes(instrument);
                return (
                  <label
                    key={instrument}
                    className={cn("flex items-center gap-2 cursor-pointer")}
                  >
                    <input
                      type="checkbox"
                      name="instruments"
                      value={instrument}
                      defaultChecked={isSelected}
                      className="accent-primary cursor-pointer"
                    />
                    <span className="text-sm">{instrument}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default InstrumentsSelection;
