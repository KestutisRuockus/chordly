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
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/Heading";

type Props = {
  params: Promise<{ id: string }>;
};
type DivLabelAndValueProps = {
  label: string;
  value: string | null;
  isCapitalized?: boolean;
};

const DivLabelAndValue = ({
  label,
  value,
  isCapitalized = true,
}: DivLabelAndValueProps) => (
  <div className="flex flex-col">
    <label className="text-sm text-muted-foreground">{label}:</label>
    <p
      className={cn(
        "text-foreground text-sm font-semibold break-words",
        isCapitalized ? "capitalize" : "",
      )}
    >
      {value ?? "N/A"}
    </p>
  </div>
);

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
          <div className="flex flex-col">
            <label className="text-sm text-muted-foreground">Full Name:</label>
            <strong className="text-foreground text-sm text-wrap">
              {teacher.fullName}
            </strong>
          </div>
          <DivLabelAndValue
            label={"Email"}
            value={teacher.email}
            isCapitalized={false}
          />
          <DivLabelAndValue
            label={"Primary instrument"}
            value={teacher.instruments[0]}
          />
          {teacher.instruments.length > 1 && (
            <DivLabelAndValue
              label={"Secondary instrument"}
              value={teacher.instruments.slice(1).join(", ")}
            />
          )}
          <DivLabelAndValue label={"Lesson Type:"} value={teacher.lessonType} />
          <DivLabelAndValue label={"Location:"} value={teacher.location} />
          <DivLabelAndValue label={"Bio:"} value={teacher.bio} />
          <DivLabelAndValue
            label={"Experience"}
            value={`${teacher.experience} years`}
            isCapitalized={false}
          />
          <DivLabelAndValue
            label={"Hourly rate:"}
            value={`${teacher.hourlyRate}€`}
          />
        </div>
        <div className="flex flex-col gap-4">
          <ProfileAvatar
            avatarUrl={teacher.avatarUrl}
            fullName={teacher.fullName}
            isTeacherProfilePage={true}
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
