import { TeacherSummaryCardProps } from "@/types/teachers";
import Link from "next/link";

type Props = {
  teacher: TeacherSummaryCardProps;
};

const TeacherCard = ({ teacher }: Props) => {
  const instrumensList = teacher.instruments.join(", ");
  return (
    <div className="border p-6 w-fit">
      <p>
        Full Name: <span className="font-bold">{teacher.fullName}</span>
      </p>
      Instruments :<p className="font-bold">{instrumensList}</p>
      <p>
        Lesson Type: Full Name:{" "}
        <span className="font-bold">{teacher.lessonType}</span>
      </p>
      <div className="flex justify-center mt-2">
        <Link href={`/find-teachers/${teacher.id}`}>
          <button className="border px-2">View Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;
