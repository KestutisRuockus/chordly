import HeaderSection from "@/components/sections/HeaderSection";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { pricing } from "../../content/pricing";
import CallToActionCard from "@/components/ui/CallToActionCard";
import Accordion from "@/components/ui/Accordion";

const PricingPage = () => {
  return (
    <Main>
      <HeaderSection {...pricing.header} />
      <Section>
        <h2 className="font-bold text-xl mb-4 mx-auto w-fit">
          {pricing.plans.sectionLabel}
        </h2>
        <div className="flex gap-8">
          {pricing.plans.cards.map((card) => (
            <div key={card.label}>
              <h3 className="font-mediums text-lg">
                {card.label}
                <span className="font-bold">{` ( ${card.price} ) `}</span>
              </h3>
              <ul className="mt-2 mb-6">
                <li>• {card.studentsLimit}</li>
                {card.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <CallToActionCard {...card.buttonCta} headingLevel="h3" />
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="font-bold">{pricing.faq.sectionLabel}</h2>
        <Accordion items={pricing.faq.items} />
      </Section>
      <CallToActionCard {...pricing.buttonCta} />
    </Main>
  );
};

export default PricingPage;
