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
    <div className="border p-2 flex flex-col gap-2 items-center">
      {headline && <Heading className="font-medium">{headline}</Heading>}
      <Link className="border px-2" href={href}>
        {buttonLabel}
      </Link>
    </div>
  );
};

export default CallToActionCard;
