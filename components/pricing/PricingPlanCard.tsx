import type { RoleType } from "@/types/role";
import type { TeacherPlan } from "@/db/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import SubHeading from "../ui/SubHeading";
import PlanUpdate from "./PlanUpdate";
import { cn } from "@/lib/utils";
import { planBackgroundColor } from "../ui/PlanBadge";

type Props = {
  label: string;
  price: string;
  studentsLimit: number | string;
  items: string[];
  role: RoleType;
  plan: TeacherPlan;
  currentPlan: TeacherPlan;
  teacherId: string | null;
};

const PricingPlanCard = ({
  label,
  price,
  studentsLimit,
  items,
  role,
  plan,
  currentPlan,
  teacherId,
}: Props) => {
  const studentLimitText =
    typeof studentsLimit !== "number"
      ? "Unlimited number of students"
      : `Up to ${studentsLimit} ${studentsLimit === 1 ? "student" : "students"}`;
  return (
    <Card className={cn("w-72 flex flex-col", planBackgroundColor[plan])}>
      <CardHeader>
        <CardTitle className="flex gap-1 justify-center items-center">
          <SubHeading subHeading={label} />
          <span className="font-bold">{` ( ${price} ) `}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="list-disc w-full px-6 pb-2">
          <li>{studentLimitText}</li>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
      {role === "teacher" && teacherId && (
        <CardFooter className="mx-auto">
          <PlanUpdate
            label={label}
            plan={plan}
            teacherId={teacherId}
            disabled={currentPlan === plan}
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default PricingPlanCard;

{
  /* <div key={card.label}>
              <h3 className="font-mediums text-lg">
                {card.label}
                <span className="font-bold">{` ( ${card.price} ) `}</span>
              </h3>
              <ul className="mt-2 mb-6">
                <li>• {card.studentsLimit}</li>
                {card.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              {role === "teacher" && teacherId && (
                <PlanUpdate
                  label={card.label}
                  plan={card.plan}
                  teacherId={teacherId}
                  disabled={currentPlan === card.plan}
                />
              )}
            </div> */
}
