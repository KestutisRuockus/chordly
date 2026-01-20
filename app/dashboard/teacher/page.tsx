import type { RoleType } from "@/types/role";
import { teachersDashboard } from "@/content/teachersDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import StudentSummaryCard from "@/components/dashboard/StudentSummaryCard";
import { studentsSummaries, teacherLessons } from "@/content/dummyData";
import TeacherScheduleAction from "@/components/dashboard/TeacherScheduleAction";
import { db } from "@/db";
import { teachers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import { TeacherWeeklySchedule } from "@/components/teacherSchedule/types";

const TeacherDashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "teacher";
  const nextLesson = teacherLessons[0];

  const teacherRow = await db
    .select({ id: teachers.id })
    .from(teachers)
    .where(eq(teachers.clerkUserId, userId))
    .limit(1);

  const teachersDbId = teacherRow[0]?.id;

  const teacherWeeklySchedule: TeacherWeeklySchedule =
    await getTeacherWeeklySchedule(teachersDbId);

  if (!teachersDbId) {
    return (
      <div className="p-6">
        Teacher profile not found in DB (no teacher record for this Clerk user).
      </div>
    );
  }

  return (
    <Main>
      <HeaderSection {...teachersDashboard.header} />
      <WeekCalendar lessons={teacherLessons} currentRole={role} />
      <Section>
        <h2 className="font-bold text-xl">Next Lesson</h2>
        <LessonCard currentRole={role} {...nextLesson} isUpcomingCard={true} />
      </Section>
      <Section>
        <h2 className="font-bold text-xl">Students</h2>
        <div className="flex flex-wrap gap-4">
          {studentsSummaries.map((student) => (
            <StudentSummaryCard key={student.id} student={student} />
          ))}
        </div>
      </Section>
      <TeacherScheduleAction
        buttonLabel={teachersDashboard.button.buttonLabel}
        teacherId={teachersDbId}
        teacherWeeklySchedule={teacherWeeklySchedule}
      />
    </Main>
  );
};

export default TeacherDashboardPage;
