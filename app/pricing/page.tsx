import type { RoleType } from "@/types/role";
import HeaderSection from "@/components/sections/HeaderSection";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { pricing } from "../../content/pricing";
import CallToActionCard from "@/components/ui/CallToActionCard";
import { auth, currentUser } from "@clerk/nextjs/server";
import PlanUpdate from "@/components/PlanUpdate";
import { getTeacherDbIdByClerkId, getTeacherPlan } from "@/db/teachers";

const PricingPage = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as RoleType;
  const { userId } = await auth();
  const teacherId =
    role === "teacher" && userId ? await getTeacherDbIdByClerkId(userId) : null;
  const currentPlan = teacherId ? await getTeacherPlan(teacherId) : "none";
  return (
    <Main>
      <HeaderSection {...pricing.header} />
      <Section>
        <h2 className="font-bold text-xl mb-4 mx-auto w-fit">
          {pricing.plans.sectionLabel}
        </h2>
        <div className="flex gap-8">
          {pricing.plans.cards.map((card) => (
            <div key={card.label}>
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
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="font-bold">{pricing.faq.sectionLabel}</h2>
        {/* <AccordionOld items={pricing.faq.items} /> */}
      </Section>
      {!role && <CallToActionCard {...pricing.buttonCta} />}
    </Main>
  );
};

export default PricingPage;
