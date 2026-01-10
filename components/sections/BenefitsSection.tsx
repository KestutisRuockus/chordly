import { BenefitsContent } from "@/types/content";
import Section from "../layout/Section";

const BenefitsSection = ({ sectionLabel, items }: BenefitsContent) => {
  return (
    <Section>
      <h2 className="font-bold mb-2">{sectionLabel}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <p className="font-medium">{item.title}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default BenefitsSection;
