"use client";

import { INSTRUMENTS_LIST } from "@/lib/constants";

type Props = {
  defaultSelected?: string[];
};

const InstrumentsSelection = ({ defaultSelected = [] }: Props) => {
  return (
    <article className="flex flex-col border p-4">
      <h3 className="font-semibold mb-2">Instruments you teach:</h3>
      {INSTRUMENTS_LIST.items.map((category) => (
        <div key={category.instrumentType} className="rounded-md">
          <h4 className="font-medium text-xs mt-1">
            {category.instrumentType}
          </h4>
          <div className="flex flex-wrap gap-3">
            {category.instruments.map((instrument) => (
              <label key={instrument} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="instruments"
                  value={instrument}
                  defaultChecked={defaultSelected.includes(instrument)}
                />
                <span className="text-sm">{instrument}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </article>
  );
};

export default InstrumentsSelection;
