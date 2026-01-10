import Main from "@/components/layout/Main";
import HeaderSection from "@/components/sections/HeaderSection";
import { faq } from "../content/faq";
import Section from "@/components/layout/Section";
import Accordion from "@/components/ui/Accordion";

const FAQPage = () => {
  return (
    <Main>
      <HeaderSection {...faq.header} />
      {faq.categories.map((category) => (
        <Section key={category.label}>
          <h2 className="font-bold mt-4 mb-1">{category.label}</h2>
          <Accordion items={category.items} />
        </Section>
      ))}
    </Main>
  );
};

export default FAQPage;
