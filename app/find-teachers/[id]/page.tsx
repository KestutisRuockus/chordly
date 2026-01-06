import { getTeacherById } from "@/db/teachers";
import { TeacherFullProfile } from "@/types/teachers";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

const TeacherFullProfileById = async ({ params }: Props) => {
  const { id } = await params;

  const teacher: TeacherFullProfile | undefined = await getTeacherById(id);

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <section className="w-4/5 mx-auto my-8">
      <Link href={"/find-teachers"} className="border px-4 w-fit">
        Back to teachers list
      </Link>
      <div className="border p-8 my-4 w-fit mx-auto">
        <h1 className="mb-4">Teacher Profile</h1>
        <p>
          Full name: <span className="font-bold">{teacher.fullName}</span>
        </p>
        <p>
          Email: <span className="font-bold">{teacher.email}</span>
        </p>
        <p>
          Primary instrument:{" "}
          <span className="font-bold">{teacher.instruments[0]}</span>
        </p>
        {teacher.instruments.length > 1 && (
          <p>
            Secondary instruments:{" "}
            <span className="font-bold">
              {teacher.instruments.slice(1).join(", ")}
            </span>
          </p>
        )}
        <p>
          Lesson Type: <span className="font-bold">{teacher.lessonType}</span>
        </p>
        {teacher.location && (
          <p>
            Location: <span className="font-bold">{teacher.location}</span>
          </p>
        )}
        <p>
          Bio: <span className="font-bold">{teacher.bio}</span>
        </p>
        {teacher.experience && (
          <p>
            Experience:{" "}
            <span className="font-bold">{teacher.experience} years</span>
          </p>
        )}
        <p>
          Hourly rate: <span className="font-bold">{teacher.hourlyRate}€</span>
        </p>

        <div className="border px-4 mx-auto w-fit mt-4">
          <Link href={""}>
            <button>Book a Lesson</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeacherFullProfileById;
