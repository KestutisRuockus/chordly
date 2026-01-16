import { studentsDashboard } from "@/app/content/studentsDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { LessonCardProps } from "../types";
import { RoleType } from "@/types/role";

const lesson: Omit<LessonCardProps, "currentRole"> = {
  lessonDate: "March 18, 2025",
  lessonTime: "16:00 – 16:45",
  lessonType: "online",
  lessonStatus: "scheduled",
  participantName: "Alex Johnson",
  instrument: "Guitar",
};

const StudentDashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "student";
  return (
    <Main>
      <div>Student Dashboard Page - authenticated student`s dashboard</div>
      <HeaderSection {...studentsDashboard.header} />
      <Section>
        <h2 className="font-bold text-xl">Upcoming Lesson</h2>
        <LessonCard currentRole={role} {...lesson} />
      </Section>
    </Main>
  );
};

export default StudentDashboardPage;
