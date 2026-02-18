import { FeatureWithIconContent } from "@/types/content";
import Section from "../layout/Section";
import Divider from "../ui/Divider";

type FeaturesWithIconsSectionProps = {
  features: FeatureWithIconContent[];
};

const FeaturesWithIconsSection = ({
  features,
}: FeaturesWithIconsSectionProps) => {
  return (
    <Section>
      <div className="grid grid-cold-3 sm:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-8 w-full bg-card rounded-md py-4 px-2 md:px-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="cols-span-3 sm:col-span-4 p-2">
              <div className="flex items-center gap-2 text-foreground">
                <Icon size={18} />
                <p className="font-medium">{feature.title}</p>
              </div>
              <p className="text-muted-foreground">{feature.description}</p>
              <Divider />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default FeaturesWithIconsSection;
