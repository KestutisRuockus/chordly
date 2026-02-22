import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string | number | null;
  isCapitalized?: boolean;
};

const DivLabelAndValueColumn = ({
  label,
  value,
  isCapitalized = true,
}: Props) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-muted-foreground">{label}:</label>
      <p
        className={cn(
          "text-foreground text-sm font-semibold break-words",
          isCapitalized ? "capitalize" : "",
        )}
      >
        {value ?? "N/A"}
      </p>
    </div>
  );
};

export default DivLabelAndValueColumn;
