import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  subHeading: string;
  textCentered?: boolean;
  className?: string;
};

const SubHeading = ({
  id,
  subHeading,
  textCentered = true,
  className,
}: Props) => {
  return (
    <h3
      id={id}
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
