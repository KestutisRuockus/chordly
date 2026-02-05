import PlanBadge from "@/components/ui/PlanBadge";
import type { TeacherPlan } from "@/db/types";
import { TEACHER_PLAN_LIMITS } from "@/lib/constants";

type Props = {
  plan: TeacherPlan;
  activeStudentsCount: number;
};

const TeacherPlan = ({ plan, activeStudentsCount }: Props) => {
  const limit = plan === "pro" ? "Unlimited" : TEACHER_PLAN_LIMITS[plan];

  return (
    <div className="flex items-center gap-2">
      {plan !== "none" && (
        <p>
          {activeStudentsCount} / {limit}
        </p>
      )}
      <PlanBadge plan={plan} />
    </div>
  );
};

export default TeacherPlan;
