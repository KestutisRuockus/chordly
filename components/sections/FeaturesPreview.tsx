import { FeaturesPreviewContent } from "@/types/content";
import Heading from "../ui/Heading";

const FeaturesPreview = ({ sectionLabel, items }: FeaturesPreviewContent) => {
  return (
    <article className="flex flex-col max-xl:w-2/5 max-md:w-3/5 max-sm:w-4/5">
      <Heading heading={sectionLabel} />
      <ul className="flex flex-1 flex-col gap-4 w-full sm:w-fit mx-auto bg-card py-10 px-6 sm:px-12 md:px-12 mt-4 rounded-md list-disc">
        {items.map((item) => (
          <li key={item}>
            <p className="font-medium text-lg text-foreground">{item}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FeaturesPreview;
