import Link from "next/link";

type Props = {
  id: string;
  name: string;
  lastLessonDate: string;
  role: string;
};

const FormerRelationCard = ({ id, name, lastLessonDate, role }: Props) => {
  const revalidatePath =
    role === "teacher"
      ? `/dashboard/teacher/student/${id}`
      : `/find-teachers/${id}`;
  return (
    <Link href={revalidatePath} className="text-xs cursor-pointer">
      <p>{name}</p>
      <p>{lastLessonDate ?? "No lessons yet"}</p>
    </Link>
  );
};

export default FormerRelationCard;
