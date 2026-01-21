import { studentsDashboard } from "@/content/studentsDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { RoleType } from "@/types/role";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import ExerciseCard from "@/components/dashboard/ExerciseCard";
import PracticeSummary from "@/components/dashboard/PracticeSummary";
import { getPracticeSummary } from "@/components/dashboard/helpers/getPracticeSummary";
import { exercises, lessons } from "@/content/dummyData";

const nextLesson = lessons[0];

const StudentDashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "student";
  // const summary = getPracticeSummary({ lessons, exercises });
  return (
    <Main>
      <HeaderSection {...studentsDashboard.header} />
      <WeekCalendar lessons={lessons} currentRole={role} />
      <Section>
        <h2 className="font-bold text-xl">Next Lesson</h2>
        <LessonCard currentRole={role} {...nextLesson} isUpcomingCard={true} />
      </Section>
      <Section>
        <h2 className="font-bold text-xl">Exercises</h2>
        {/* <div className="flex flex-wrap gap-4">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div> */}
      </Section>
      {/* <PracticeSummary summary={summary} /> */}
    </Main>
  );
};

export default StudentDashboardPage;
