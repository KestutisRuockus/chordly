import type { RoleType } from "@/types/role";
import { teachersDashboard } from "@/app/content/teachersDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import StudentSummaryCard from "@/components/dashboard/StudentSummaryCard";
import { studentsSummaries, teacherLessons } from "@/app/content/dummyData";

const TeacherDashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "teacher";
  const nextLesson = teacherLessons[0];
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
    </Main>
  );
};

export default TeacherDashboardPage;
