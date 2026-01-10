import { HeroContent } from "@/types/content";
import CallToActionCard from "../ui/CallToActionCard";

const HeroSection = ({ headline, subHeadline, buttonCta }: HeroContent) => {
  return (
    <section className="mx-auto w-fit border p-6">
      <h1 className="text-2xl">{headline}</h1>
      <p>{subHeadline}</p>
      {buttonCta && <CallToActionCard {...buttonCta} />}
    </section>
  );
};

export default HeroSection;
