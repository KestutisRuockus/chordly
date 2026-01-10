import { FeaturesPreviewContent } from "@/types/content";
import Section from "../layout/Section";

const FeaturesPreview = ({ sectionLabel, items }: FeaturesPreviewContent) => {
  return (
    <Section>
      <h2 className="font-bold mb-2">{sectionLabel}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </Section>
  );
};

export default FeaturesPreview;
