import { TeacherSummaryCardProps } from "@/types/teachers";
import CallToActionCard from "../ui/CallToActionCard";

type Props = {
  teacher: TeacherSummaryCardProps;
};

const TeacherCard = ({ teacher }: Props) => {
  const instrumensList = teacher.instruments.join(", ");
  return (
    <div
      aria-label={`${teacher.fullName} profile card`}
      className="border flex flex-col gap-1 py-6 px-4 w-52 rounded-md bg-card"
    >
      <dl className="flex flex-col">
        <dt className="text-xs text-muted-foreground">Full Name:</dt>
        <dd className="text-foreground text-sm font-semibold">
          {teacher.fullName}
        </dd>
      </dl>
      <dl className="flex flex-col">
        <dt className="text-xs text-muted-foreground">Instruments:</dt>
        <dd className="text-foreground text-sm font-semibold">
          {instrumensList}
        </dd>
      </dl>
      <dl className="flex flex-col">
        <dt className="text-xs text-muted-foreground">Lesson Type:</dt>
        <dd className="text-foreground text-sm font-semibold">
          {teacher.lessonType}
        </dd>
      </dl>

      <div className="flex justify-center mt-2">
        <CallToActionCard
          buttonLabel="View Profile"
          href={`/find-teachers/${teacher.id}`}
        />
      </div>
    </div>
  );
};

export default TeacherCard;
