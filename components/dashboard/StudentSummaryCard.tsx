import type { StudentSummary } from "@/db/types";
import Link from "next/link";

const StudentSummaryCard = ({ student }: { student: StudentSummary }) => {
  return (
    <div className="flex flex-col max-w-72 p-2 border rounded-lg">
      <p>Name: {student.name}</p>
      <p className="capitalize">Lesson Type: {student.lessonType}</p>
      <Link
        href={`/dashboard/teacher/student/${student.id}`}
        className="border rounded-lg px-2 mt-2 text-center"
      >
        View Profile
      </Link>
    </div>
  );
};

export default StudentSummaryCard;
