import { HeroContent } from "@/types/content";
import CallToActionCard from "../ui/CallToActionCard";
import Section from "../layout/Section";

const HeroSection = ({ headline, subHeadline, buttonCta }: HeroContent) => {
  return (
    <Section className="flex flex-col justify-between items-center gap-6 shadow-sm pt-12">
      <div className="flex flex-col items-center justify-center text-center gap-1 w-full">
        <h1 className="text-2xl md:text-3xl text-foreground items-center">
          {headline}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground w-4/5 md:w-3/5 text-center leading-5">
          {subHeadline}
        </p>
      </div>
      {buttonCta && <CallToActionCard {...buttonCta} />}
    </Section>
  );
};

export default HeroSection;
