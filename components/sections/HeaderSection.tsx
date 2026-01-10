import { HeaderContent } from "@/types/content";
import Section from "../layout/Section";

const HeaderSection = ({ title, description }: HeaderContent) => {
  return (
    <Section>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="font-medium">{description}</p>
    </Section>
  );
};

export default HeaderSection;
