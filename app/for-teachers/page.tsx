import BenefitsSection from "@/components/sections/BenefitsSection";
import FeaturesPreview from "@/components/sections/FeaturesPreview";
import HeroSection from "@/components/sections/HeroSection";
import CallToActionCard from "@/components/ui/CallToActionCard";
import Main from "@/components/layout/Main";
import { forTeachers } from "../../content/forTeachers";

const ForTeachersPage = () => {
  return (
    <Main>
      <HeroSection {...forTeachers.hero} />
      <BenefitsSection {...forTeachers.benefits} />
      <FeaturesPreview {...forTeachers.features} />
      <CallToActionCard {...forTeachers.buttonCta} />
    </Main>
  );
};

export default ForTeachersPage;
