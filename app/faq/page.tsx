import Main from "@/components/layout/Main";
import { faq } from "../../content/faq";
import Section from "@/components/layout/Section";
import HeroSection from "@/components/sections/HeroSection";
import SubHeading from "@/components/ui/SubHeading";
import { AccordionMultiple } from "@/components/ui/AccordionMultiple";

const FAQPage = () => {
  return (
    <Main>
      <HeroSection {...faq.header} />
      {faq.categories.map((category) => (
        <Section key={category.label}>
          <SubHeading
            subHeading={category.label}
            textCentered={false}
            className={"sm:ml-[20%]"}
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
