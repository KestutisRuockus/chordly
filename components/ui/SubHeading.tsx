import { cn } from "@/lib/utils";

type Props = {
  subHeading: string;
  textCentered?: boolean;
  className?: string;
};

const SubHeading = ({ subHeading, textCentered = true, className }: Props) => {
  return (
    <h3
      className={cn(
        "font-medium text-xl",
        `${textCentered ? "text-center" : ""} text-foreground"`,
        className,
      )}
    >
      {subHeading}
    </h3>
  );
};

export default SubHeading;
