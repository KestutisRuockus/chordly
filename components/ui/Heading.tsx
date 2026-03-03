import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  className?: string;
  textCentered?: boolean;
};

const Heading = ({ heading, className, textCentered = true }: Props) => {
  return (
    <h2
      className={cn(
        "font-bold text-2xl text-center text-foreground",
        textCentered ? "text-center" : "text-start",
        className,
      )}
    >
      {heading}
    </h2>
  );
};

export default Heading;
