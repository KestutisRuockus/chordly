import Main from "@/components/layout/Main";
import HeroSection from "@/components/sections/HeroSection";
import { forStudents } from "../../content/forStudents";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import Section from "@/components/layout/Section";

const ForStudentsPage = () => {
  return (
    <Main>
      <HeroSection {...forStudents.hero} />
      <Section className="flex flex-col lg:flex-row gap-8 justify-center max-lg:items-center ">
        <BenefitsSection {...forStudents.benefits} />
        <FeaturesPreview {...forStudents.features} />
      </Section>
    </Main>
  );
};

export default ForStudentsPage;
