import type { RoleType } from "@/types/role";
import type { TeacherRow } from "@/db/types";
import BookingScheduleAction from "@/components/BookingScheduleAction";
import BackButton from "@/components/ui/BackButton";
import { getStudentDbIdByClerkId } from "@/db/students";
import { getTeacherById } from "@/db/teachers";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getAllLessonsByRoleAndId } from "@/db/lesson";
import ProfileAvatar from "@/components/ui/ProfileAvatar";

type Props = {
  params: Promise<{ id: string }>;
};

const TeacherFullProfileById = async ({ params }: Props) => {
  const { id } = await params;
  const { userId } = await auth();
  const user = await currentUser();
  const userRole = user?.publicMetadata?.role as RoleType | undefined;

  const studentDbId =
    userId && userRole === "student"
      ? await getStudentDbIdByClerkId(userId)
      : null;

  const teacher: TeacherRow | undefined = await getTeacherById(id);

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  console.log("ads", teacher);

  const today = new Date();
  const fromDate = today.toISOString().split("T")[0];

  const to = new Date();
  to.setDate(to.getDate() + 7);
  const toDate = to.toISOString().split("T")[0];

  const [teacherWeeklySchedule, teacherBookedSlots] = await Promise.all([
    getTeacherWeeklySchedule(teacher.id),
    getAllLessonsByRoleAndId({
      role: "teacher",
      id: teacher.id,
      fromDate,
      toDate,
    }),
  ]);

  return (
    <section className="w-4/5 mx-auto my-8">
      <BackButton text="Go back" />
      <h1 className="mb-4">Teacher Profile</h1>
      <div className="border flex justify-center gap-12 p-8 my-4 w-1/2 mx-auto">
        <div className="flex flex-col gap-1 max-w-1/2">
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
            Hourly rate:{" "}
            <span className="font-bold">{teacher.hourlyRate}€</span>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <ProfileAvatar
            avatarUrl={teacher.avatarUrl}
            fullName={teacher.fullName}
          />
          {userRole === "student" && studentDbId && (
            <BookingScheduleAction
              buttonLabel={"Book a lesson"}
              studentId={studentDbId}
              teacherId={teacher.id}
              teacherWeeklySchedule={teacherWeeklySchedule}
              teacherInstruments={teacher.instruments}
              teacherBookedSlots={teacherBookedSlots}
              lessonType={teacher.lessonType}
              lessonLocation={teacher.lessonLocation}
              meetingUrl={teacher.meetingUrl}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TeacherFullProfileById;
