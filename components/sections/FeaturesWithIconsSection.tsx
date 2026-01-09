import { FeatureWithIconContent } from "@/types/content";

type FeaturesWithIconsSectionProps = {
  features: FeatureWithIconContent[];
};

const FeaturesWithIconsSection = ({
  features,
}: FeaturesWithIconsSectionProps) => {
  return (
    <section className="mx-auto w-fit border p-6 flex flex-col gap-2">
      {features.map((feature) => (
        <div key={feature.title}>
          <div className="flex gap-2">
            <p className="italic">Icon</p>
            <p className="font-medium">{feature.title}</p>
          </div>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default FeaturesWithIconsSection;
