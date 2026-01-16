import { studentsDashboard } from "@/app/content/studentsDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { LessonCardProps } from "../types";
import { RoleType } from "@/types/role";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";

const lessons: Omit<LessonCardProps, "currentRole">[] = [
  {
    lessonDate: "2026-01-14",
    lessonTime: "16:00 – 16:45",
    lessonType: "online",
    lessonStatus: "scheduled",
    participantName: "Alex Johnson",
    instrument: "Guitar",
  },
  {
    lessonDate: "2026-01-16",
    lessonTime: "18:30 – 19:15",
    lessonType: "in-person",
    lessonStatus: "completed",
    participantName: "Maria Lopez",
    instrument: "Piano",
  },
  {
    lessonDate: "2026-01-13",
    lessonTime: "18:30 – 19:15",
    lessonType: "in-person",
    lessonStatus: "completed",
    participantName: "Maria Lopez",
    instrument: "Piano",
  },
  {
    lessonDate: "2026-01-16",
    lessonTime: "14:00 – 14:45",
    lessonType: "hybrid",
    lessonStatus: "cancelled",
    participantName: "Daniel Kim",
    instrument: "Violin",
  },
  {
    lessonDate: "2026-01-18",
    lessonTime: "17:00 – 17:45",
    lessonType: "online",
    lessonStatus: "scheduled",
    participantName: "Hannah Lee",
    instrument: "Piano",
  },
];

const StudentDashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "student";
  return (
    <Main>
      <div>Student Dashboard Page - authenticated student`s dashboard</div>
      <HeaderSection {...studentsDashboard.header} />
      <WeekCalendar lessons={lessons} currentRole={role} />
      <Section>
        <h2 className="font-bold text-xl">Next Lesson</h2>
        <LessonCard currentRole={role} {...lessons[0]} isUpcomingCard={true} />
      </Section>
    </Main>
  );
};

export default StudentDashboardPage;
