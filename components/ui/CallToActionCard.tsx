import { cn } from "@/lib/utils";
import { CallToActionCardType } from "@/types/content";
import Link from "next/link";

const CallToActionCard = ({
  headline,
  buttonLabel,
  href,
  headingLevel = "h2",
}: CallToActionCardType) => {
  const Heading = headingLevel;

  return (
    <div
      className={cn(
        "bg-primary rounded-md text-primary-foreground py-2 px-4 flex flex-col items-center gap-1 w-full sm:w-fit",
      )}
    >
      {headline && (
        <Heading className="font-medium text-foreground">{headline}</Heading>
      )}
      <Link
        className="w-full text-center bg-surface px-2 rounded-md hover:bg-surface/70 transition-colors duration-300"
        href={href}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default CallToActionCard;
