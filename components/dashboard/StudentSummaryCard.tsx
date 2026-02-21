import type { StudentSummary } from "@/db/types";
import Link from "next/link";

const StudentSummaryCard = ({ student }: { student: StudentSummary }) => {
  return (
    <div className="flex flex-col w-3/5 max-sm:mx-auto sm:w-60 p-3 border rounded-lg text-foreground bg-background">
      <p>
        Name: <b>{student.name}</b>
      </p>
      <Link
        href={`/dashboard/teacher/student/${student.id}`}
        className="border rounded-lg px-2 mt-2 text-center bg-primary text-primary-foreground hover:bg-primary/70 transition-colors duration-300"
      >
        View Profile
      </Link>
    </div>
  );
};

export default StudentSummaryCard;
