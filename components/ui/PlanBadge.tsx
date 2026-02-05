import { TeacherPlan } from "@/db/types";

type Props = {
  plan: TeacherPlan;
};

const badgeColor: Record<TeacherPlan, string> = {
  none: "bg-red-300 border-red-400",
  basic: "bg-yellow-300 border-yellow-400",
  medium: "bg-orange-300 border-orange-400",
  pro: "bg-green-300 border-green-400",
};

const PlanBadge = ({ plan }: Props) => {
  const content = plan === "none" ? "No active plan" : plan;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 border rounded-full text-xs ${badgeColor[plan]}`}
    >
      {content}
    </span>
  );
};

export default PlanBadge;
