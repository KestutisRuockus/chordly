import { HeroContent } from "@/types/content";
import CallToActionCard from "../ui/CallToActionCard";
import Section from "../layout/Section";

const HeroSection = ({ headline, subHeadline, buttonCta }: HeroContent) => {
  return (
    <Section>
      <h1 className="text-2xl">{headline}</h1>
      <p>{subHeadline}</p>
      {buttonCta && <CallToActionCard {...buttonCta} />}
    </Section>
  );
};

export default HeroSection;
