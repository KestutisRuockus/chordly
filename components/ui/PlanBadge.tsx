import { TeacherPlan } from "@/db/types";
import { Badge } from "@/components/ui/badge";

type Props = {
  plan: TeacherPlan;
};

export const planBackgroundColor: Record<TeacherPlan, string> = {
  none: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  basic: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  medium: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  pro: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const PlanBadge = ({ plan }: Props) => {
  const content = plan === "none" ? "No active plan" : plan;
  return (
    <Badge title="Subscription plan" className={planBackgroundColor[plan]}>
      {content}
    </Badge>
  );
};

export default PlanBadge;
