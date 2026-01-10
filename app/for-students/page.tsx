import Main from "@/components/layout/Main";
import HeroSection from "@/components/sections/HeroSection";
import { forStudents } from "../content/forStudents";
import BenefitsSection from "@/components/sections/BenefitsSection";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import CallToActionCard from "@/components/ui/CallToActionCard";

const ForStudentsPage = () => {
  return (
    <Main>
      <HeroSection {...forStudents.hero} />
      <BenefitsSection {...forStudents.benefits} />
      <FeaturesPreview {...forStudents.features} />
      <CallToActionCard {...forStudents.buttonCta} />
    </Main>
  );
};

export default ForStudentsPage;
