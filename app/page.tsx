import HeroSection from "@/components/sections/HeroSection";
import { homeContent } from "../content/home";
import FeaturesWithIconsSection from "@/components/sections/FeaturesWithIconsSection";
import CallToActionCard from "@/components/ui/CallToActionCard";
import Section from "@/components/layout/Section";
import Main from "@/components/layout/Main";
import { RoleType } from "@/types/role";
import { currentUser } from "@clerk/nextjs/server";
import SectionTitle from "@/components/sections/SectionTitle";
import HowItWorksFlow from "@/components/HowItWorksFlow";
import Testimonials from "@/components/Testimonials";

export default async function Home() {
  const user = await currentUser();
  const role = user?.publicMetadata?.role as RoleType;
  return (
    <Main>
      <HeroSection {...homeContent.hero} />
      <Section>
        <SectionTitle
          title={homeContent.howItWorks.sectionLabel}
          description={homeContent.howItWorks.title}
        />
        <div className="flex flex-col md:flex-row justify-center gap-12 xl:gap-24 my-8">
          <HowItWorksFlow
            label={homeContent.howItWorks.studentFlow.label}
            items={homeContent.howItWorks.studentFlow.items}
          />
          <HowItWorksFlow
            label={homeContent.howItWorks.teacherFlow.label}
            items={homeContent.howItWorks.teacherFlow.items}
          />
        </div>
      </Section>
      <FeaturesWithIconsSection features={homeContent.features} />
      {role === "student" && (
        <Section className="flex justify-center items-center flex-col sm:flex-row gap-4 sm:gap-8">
          <CallToActionCard {...homeContent.forStudentsCta} headingLevel="h3" />
          <CallToActionCard
            {...homeContent.forStudentsCta2}
            headingLevel="h3"
          />
        </Section>
      )}
      {role === "teacher" && (
        <Section className="flex justify-center items-center flex-col sm:flex-row gap-4 sm:gap-8">
          <CallToActionCard {...homeContent.forTeachersCta} headingLevel="h3" />
        </Section>
      )}
      {!role && (
        <Section>
          <div className="w-full justify-center items-center flex flex-col sm:flex-row gap-4 sm:gap-8">
            <CallToActionCard
              {...homeContent.noRoleSignInCta}
              headingLevel="h3"
            />
            <CallToActionCard
              {...homeContent.noRoleSignUpCta}
              headingLevel="h3"
            />
          </div>
        </Section>
      )}
      <Section>
        <Testimonials />
      </Section>
    </Main>
  );
}
