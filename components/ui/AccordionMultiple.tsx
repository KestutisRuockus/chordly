import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionMultipleItem = {
  header: string;
  body: string;
};

type AccordionMultipleProps = {
  items: AccordionMultipleItem[];
  defaultValue?: string[];
  className?: string;
};

export function AccordionMultiple({
  items,
  defaultValue = [],
  className,
}: AccordionMultipleProps) {
  return (
    <Accordion
      type="multiple"
      className={cn("w-full flex flex-col gap-4 mt-4", className)}
      defaultValue={defaultValue}
    >
      {items.map((item) => (
        <AccordionItem key={item.header} value={item.header}>
          <AccordionTrigger className="bg-secondary text-secondary-foreground px-6 data-[state=closed]:rounded-md data-[state=open]:rounded-t-md">
            {item.header}
          </AccordionTrigger>
          <AccordionContent className="bg-background px-6 py-4 text-secondary-foreground rounded-b-md">
            {item.body}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
