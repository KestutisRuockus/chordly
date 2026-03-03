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
import Section from "@/components/layout/Section";
import Heading from "@/components/ui/Heading";
import DescriptionList from "@/components/ui/DescriptionList";

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
    <Section className="w-full lg:w-3/5 mx-auto my-8">
      <BackButton text="Go back" />
      <Heading heading="Teacher Profile" />
      <div className="bg-card rounded-md flex max-[500px]:flex-col-reverse justify-center gap-12 p-8 my-4 w-full xl:w-4/5 mx-auto">
        <div className="flex flex-col gap-1 max-w-1/2">
          <DescriptionList label="Full Name" value={teacher.fullName} />
          <DescriptionList
            label={"Email"}
            value={teacher.email}
            isCapitalized={false}
          />
          <DescriptionList
            label={"Primary instrument"}
            value={teacher.instruments[0]}
          />
          {teacher.instruments.length > 1 && (
            <DescriptionList
              label={"Secondary instrument"}
              value={teacher.instruments.slice(1).join(", ")}
            />
          )}
          <DescriptionList label={"Lesson Type:"} value={teacher.lessonType} />
          <DescriptionList label={"Location:"} value={teacher.location} />
          <DescriptionList label={"Bio:"} value={teacher.bio} />
          <DescriptionList
            label={"Experience"}
            value={`${teacher.experience} years`}
            isCapitalized={false}
          />
          <DescriptionList
            label={"Hourly rate:"}
            value={`${teacher.hourlyRate}€`}
          />
        </div>
        <div className="flex flex-col gap-4">
          <ProfileAvatar
            avatarUrl={teacher.avatarUrl}
            fullName={teacher.fullName}
            showName={false}
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
    </Section>
  );
};

export default TeacherFullProfileById;
