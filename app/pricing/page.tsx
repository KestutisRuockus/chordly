import type { RoleType } from "@/types/role";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { pricing } from "../../content/pricing";
import CallToActionCard from "@/components/ui/CallToActionCard";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getTeacherDbIdByClerkId, getTeacherPlan } from "@/db/teachers";
import HeroSection from "@/components/sections/HeroSection";
import CallToActionCardWrapper from "@/components/ui/CallToActionCardWrapper";
import Heading from "@/components/ui/Heading";
import { AccordionMultiple } from "@/components/ui/AccordionMultiple";
import PricingPlanCard from "@/components/pricing/PricingPlanCard";

const PricingPage = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as RoleType;
  const { userId } = await auth();
  const teacherId =
    role === "teacher" && userId ? await getTeacherDbIdByClerkId(userId) : null;
  const currentPlan = teacherId ? await getTeacherPlan(teacherId) : "none";
  return (
    <Main>
      <HeroSection {...pricing.header} />
      <Section>
        <Heading heading={pricing.plans.sectionLabel} />
        <div className="w-full flex flex-wrap justify-center gap-8 my-8">
          {pricing.plans.cards.map((card) => (
            <PricingPlanCard
              key={card.label}
              {...card}
              role={role}
              currentPlan={currentPlan}
              teacherId={teacherId}
            />
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="font-bold">{pricing.faq.sectionLabel}</h2>
        <AccordionMultiple items={pricing.faq.items} />
      </Section>
      {!role && (
        <CallToActionCardWrapper>
          <CallToActionCard {...pricing.buttonCta} />
        </CallToActionCardWrapper>
      )}
    </Main>
  );
};

export default PricingPage;
