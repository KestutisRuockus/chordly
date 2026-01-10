import { AccordionContent } from "@/types/content";

type Props = {
  items: AccordionContent[];
};

const Accordion = ({ items }: Props) => {
  return (
    <ul className="border">
      {items.map((item) => (
        <li key={item.header} className="py-1 px-2">
          <p className="font-medium flex justify-between items-center w-full">
            {item.header} <span className="italic text-xs">Icon</span>
          </p>
          <p className="text-sm">{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
