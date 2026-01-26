"use client";

import type { LessonStatus } from "@/app/dashboard/types";
import { Info } from "lucide-react";

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-200 text-blue-600 border-blue-300",
  },
  rescheduled: {
    label: "Rescheduled",
    className: "bg-black text-orange-400 border-orange-300",
  },
  completed: {
    label: "Completed",
    className: "bg-green-200 text-green-600 border-green-300",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-200 text-red-600 border-red-300",
  },
} as const;

const StatusBadge = ({
  status,
  statusNote,
}: {
  status: LessonStatus;
  statusNote: string | null;
}) => {
  const config = statusConfig[status];
  const hasNote = Boolean(statusNote);

  return (
    <div
      className={`${statusNote ? "group" : ""} flex flex-col absolute top-0 left-0 w-full h-full text-xs rounded-t-lg border pointer-events-none`}
    >
      <div
        className={`flex justify-between items-center px-2 ${config.className} pointer-events-auto`}
      >
        {config.label}
        <Info size={12} />
      </div>

      {hasNote && (
        <div
          className={`
          w-full overflow-hidden rounded-b-lg text-xs
          h-0 opacity-0 p-1 transition-all duration-200
          group-hover:h-full group-hover:opacity-100 group-hover:bg-slate-300
`}
        >
          {statusNote}
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
