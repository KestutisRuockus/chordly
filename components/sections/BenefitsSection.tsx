import { BenefitsContent } from "@/types/content";
import Heading from "../ui/Heading";

const BenefitsSection = ({ sectionLabel, items }: BenefitsContent) => {
  return (
    <article className="flex flex-col max-xl:w-3/5 max-md:w-4/5 max-sm:w-full">
      <Heading heading={sectionLabel} />
      <ul className="flex flex-1 flex-col gap-4 w-full sm:w-fit mx-auto bg-card py-10 px-6 sm:px-12 md:px-12 mt-4 rounded-md">
        {items.map((item) => (
          <li key={item.title}>
            <p className="font-medium text-lg text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default BenefitsSection;
