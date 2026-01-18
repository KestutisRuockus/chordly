import type { RoleType } from "@/types/role";
import type { Lesson, StudentSummary } from "../types";
import { teachersDashboard } from "@/app/content/teachersDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import StudentSummaryCard from "@/components/dashboard/StudentSummaryCard";

export const teacherLessons: Lesson[] = [
  {
    id: "t-lesson-1",
    lessonDate: "2026-01-17",
    lessonTime: "16:00 – 16:45",
    lessonType: "online",
    lessonStatus: "scheduled",
    participantName: "Alex Johnson",
    instrument: "Guitar",
  },
  {
    id: "t-lesson-2",
    lessonDate: "2026-01-16",
    lessonTime: "18:30 – 19:15",
    lessonType: "in-person",
    lessonStatus: "scheduled",
    participantName: "Maria Lopez",
    instrument: "Piano",
  },
  {
    id: "t-lesson-3",
    lessonDate: "2026-01-12",
    lessonTime: "14:00 – 14:45",
    lessonType: "hybrid",
    lessonStatus: "completed",
    participantName: "Daniel Kim",
    instrument: "Violin",
  },
  {
    id: "t-lesson-4",
    lessonDate: "2026-01-12",
    lessonTime: "17:00 – 17:45",
    lessonType: "online",
    lessonStatus: "cancelled",
    participantName: "Hannah Lee",
    instrument: "Piano",
  },
];

export const students: StudentSummary[] = [
  {
    id: "st-1",
    name: "Alex Johnson",
    instrument: "Guitar",
    lessonType: "online",
  },
  {
    id: "st-2",
    name: "Maria Lopez",
    instrument: "Piano",
    lessonType: "in-person",
  },
  {
    id: "st-3",
    name: "Daniel Kim",
    instrument: "Violin",
    lessonType: "in-person",
  },
  {
    id: "st-4",
    name: "Hannah Lee",
    instrument: "Drums",
    lessonType: "hybrid",
  },
];

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
          {students.map((student) => (
            <StudentSummaryCard key={student.id} student={student} />
          ))}
        </div>
      </Section>
    </Main>
  );
};

export default TeacherDashboardPage;
