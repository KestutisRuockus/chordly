import Main from "@/components/layout/Main";
import { faq } from "../../content/faq";
import Section from "@/components/layout/Section";
import HeroSection from "@/components/sections/HeroSection";
import { AccordionMultiple } from "@/components/ui/AccordionMultiple";
import Heading from "@/components/ui/Heading";

const FAQPage = () => {
  return (
    <Main>
      <HeroSection {...faq.header} />
      {faq.categories.map((category) => (
        <Section key={category.label}>
          <Heading
            heading={category.label}
            className={"sm:ml-[20%]"}
            textCentered={false}
          />
          <AccordionMultiple
            items={category.items}
            className="sm:w-3/5 mx-auto"
          />
        </Section>
      ))}
    </Main>
  );
};

export default FAQPage;
