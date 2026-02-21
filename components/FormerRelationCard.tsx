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
    <Link
      href={revalidatePath}
      className="text-sm p-2 rounded-md cursor-pointer bg-background text-foreground hover:bg-primary/20 transition-colors duration-300"
    >
      <p className="font-medium">{name}</p>
      <p className="text-xs">{lastLessonDate ?? "No lessons yet"}</p>
    </Link>
  );
};

export default FormerRelationCard;
