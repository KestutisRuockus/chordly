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
    <div className="flex items-center gap-2 text-secondary-foreground border border-primary p-2 rounded-md relative">
      <label className="absolute -top-2 right-0.5 text-[10px] text-foreground px-1 bg-secondary">
        Subscription
      </label>
      {plan !== "none" && (
        <p title="Current students / Plan limit">
          {plan === "pro" ? limit : `${activeStudentsCount} / ${limit}`}
        </p>
      )}
      <PlanBadge plan={plan} />
    </div>
  );
};

export default TeacherPlan;
