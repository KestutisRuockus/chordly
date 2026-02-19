import type { LessonType } from "@/app/dashboard/types";

type Props = {
  lessonType?: LessonType | null;
  selectedLessonType: LessonType | null;
  onChange: (value: LessonType) => void;
};

type CheckboxInputProps = {
  label: string;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: () => void;
};

const CheckboxInput = ({
  label,
  checked = true,
  readOnly = true,
  onChange,
}: CheckboxInputProps) => (
  <label className="flex items-center text-foreground text-sm">
    <input
      type="checkbox"
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
    return <CheckboxInput label="In person" />;
  }
  if (lessonType === "online") {
    return <CheckboxInput label="Online" />;
  }
  return (
    <div className="flex gap-4">
      <CheckboxInput
        label="In person"
        checked={selectedLessonType === "in-person"}
        readOnly={false}
        onChange={() => onChange("in-person")}
      />
      <CheckboxInput
        label="Online"
        checked={selectedLessonType === "online"}
        readOnly={false}
        onChange={() => onChange("online")}
      />
    </div>
  );
};

export default LessonTypeSelector;
