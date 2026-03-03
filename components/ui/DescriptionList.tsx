import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number | null;
  isCapitalized?: boolean;
};

const DescriptionList = ({ label, value, isCapitalized = true }: Props) => {
  return (
    <dl className="flex flex-col">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "text-foreground text-sm font-semibold break-words",
          isCapitalized ? "capitalize" : "",
        )}
      >
        {value ?? "N/A"}
      </dd>
    </dl>
  );
};

export default DescriptionList;
