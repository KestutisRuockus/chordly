"use client";

import type { LessonStatus } from "@/app/dashboard/types";
import { Info } from "lucide-react";

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: "bg-scheduled text-scheduled-foreground",
  },
  rescheduled: {
    label: "Rescheduled",
    className: "bg-rescheduled text-rescheduled-foreground",
  },
  completed: {
    label: "Completed",
    className: "bg-success text-success-foreground",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive text-destructive-foreground",
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
      className={`${statusNote ? "group" : ""} flex flex-col absolute top-0 left-0 w-full h-full text-xs rounded-t-md border pointer-events-none`}
    >
      <div
        className={`flex justify-between items-center px-2 ${config.className} pointer-events-auto rounded-t-md`}
      >
        {config.label}
        {status !== "scheduled" && <Info size={12} />}
      </div>

      {hasNote && (
        <div
          className={`
          w-full overflow-hidden rounded-b-md text-xs
          h-0 opacity-0 p-1 transition-all duration-200 
          group-hover:h-full group-hover:opacity-100 group-hover:bg-surface text-foreground
`}
        >
          {statusNote}
        </div>
      )}
    </div>
  );
};

export default StatusBadge;
