import { TeacherSummaryCardProps } from "@/types/teachers";
import CallToActionCard from "../ui/CallToActionCard";

type Props = {
  teacher: TeacherSummaryCardProps;
};

const TeacherCard = ({ teacher }: Props) => {
  const instrumensList = teacher.instruments.join(", ");
  return (
    <div className="border flex flex-col gap-1 py-6 px-4 w-52 rounded-md bg-card">
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Full Name:</label>
        <strong className="text-foreground text-sm text-wrap">
          {teacher.fullName}
        </strong>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Instruments:</label>
        <p className="text-foreground text-sm font-semibold">
          {instrumensList}
        </p>
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-muted-foreground">Lesson Type:</label>
        <p className="text-foreground text-sm font-semibold capitalize">
          {teacher.lessonType}
        </p>
      </div>
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
