import { HeroContent } from "@/types/content";

const HeroSection = ({ headline, subHeadline }: HeroContent) => {
  return (
    <section className="mx-auto w-fit border p-6">
      <h1 className="text-2xl">{headline}</h1>
      <p>{subHeadline}</p>
    </section>
  );
};

export default HeroSection;
