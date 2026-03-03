import type { LessonType } from "@/app/dashboard/types";

type Props = {
  lessonType?: LessonType | null;
  selectedLessonType: LessonType | null;
  onChange: (value: LessonType) => void;
};

type RadioInputProps = {
  label: string;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: () => void;
  name?: string;
};

const RadioInput = ({
  label,
  checked = true,
  readOnly = true,
  onChange,
  name,
}: RadioInputProps) => (
  <label className="flex items-center text-foreground text-sm">
    <input
      type="radio"
      name={name}
      checked={checked}
      readOnly={readOnly}
      onChange={onChange}
      className="mr-2 accent-primary"
    />
    {label}
  </label>
);

const LessonTypeSelector = ({
  lessonType,
  selectedLessonType,
  onChange,
}: Props) => {
  if (lessonType === "in-person") {
    return <RadioInput label="In person" name="lessonType" />;
  }
  if (lessonType === "online") {
    return <RadioInput label="Online" name="lessonType" />;
  }
  return (
    <div className="flex gap-4">
      <RadioInput
        label="In person"
        name="lessonType"
        checked={selectedLessonType === "in-person"}
        readOnly={false}
        onChange={() => onChange("in-person")}
      />
      <RadioInput
        label="Online"
        name="lessonType"
        checked={selectedLessonType === "online"}
        readOnly={false}
        onChange={() => onChange("online")}
      />
    </div>
  );
};

export default LessonTypeSelector;
