import type { StudentSummary } from "@/app/dashboard/types";
import Link from "next/link";

type Props = {
  student: StudentSummary;
};

const StudentSummaryCard = ({ student }: Props) => {
  return (
    <div className="flex flex-col max-w-72 p-2 border rounded-lg">
      <p>Name: {student.name}</p>
      <p>Instrument: {student.instrument}</p>
      <p className="capitalize">Lesson Type: {student.lessonType}</p>
      <Link
        href={`/dashboard/teacher/students/${student.id}`}
        className="border rounded-lg px-2 mt-2 text-center"
      >
        View Profile
      </Link>
    </div>
  );
};

export default StudentSummaryCard;
