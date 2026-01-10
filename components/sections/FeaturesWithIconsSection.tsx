import { FeatureWithIconContent } from "@/types/content";
import Section from "../layout/Section";

type FeaturesWithIconsSectionProps = {
  features: FeatureWithIconContent[];
};

const FeaturesWithIconsSection = ({
  features,
}: FeaturesWithIconsSectionProps) => {
  return (
    <Section className="flex flex-col gap-2">
      {features.map((feature) => (
        <div key={feature.title}>
          <div className="flex gap-2">
            <p className="italic">Icon</p>
            <p className="font-medium">{feature.title}</p>
          </div>
          <p>{feature.description}</p>
        </div>
      ))}
    </Section>
  );
};

export default FeaturesWithIconsSection;
