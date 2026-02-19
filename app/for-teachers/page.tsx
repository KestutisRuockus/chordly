import BenefitsSection from "@/components/sections/BenefitsSection";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import HeroSection from "@/components/sections/HeroSection";
import Main from "@/components/layout/Main";
import { forTeachers } from "../../content/forTeachers";
import Section from "@/components/layout/Section";

const ForTeachersPage = () => {
  return (
    <Main>
      <HeroSection {...forTeachers.hero} />
      <Section className="flex flex-col lg:flex-row gap-8 justify-center max-lg:items-center ">
        <BenefitsSection {...forTeachers.benefits} />
        <FeaturesPreview {...forTeachers.features} />
      </Section>
    </Main>
  );
};

export default ForTeachersPage;
