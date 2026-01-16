import { LessonStatus } from "@/app/dashboard/types";

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-200 text-blue-600 border-blue-300",
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

const StatusBadge = ({ status }: { status: LessonStatus }) => {
  const config = statusConfig[status];

  return (
    <span
      className={`absolute top-0 right-0 text-xs px-1 rounded-bl-lg border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
