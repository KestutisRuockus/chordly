import { studentsDashboard } from "@/app/content/studentsDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { LessonCardProps } from "../types";
import { RoleType } from "@/types/role";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import ExerciseCard, { Exercise } from "@/components/dashboard/ExerciseCard";
import PracticeSummary from "@/components/dashboard/PracticeSummary";
import { getPracticeSummary } from "@/components/dashboard/helpers/getPracticeSummary";

const lessons: Omit<LessonCardProps, "currentRole">[] = [
  {
    id: "1",
    lessonDate: "2026-01-14",
    lessonTime: "16:00 – 16:45",
    lessonType: "online",
    lessonStatus: "scheduled",
    participantName: "Alex Johnson",
    instrument: "Guitar",
  },
  {
    id: "2",
    lessonDate: "2026-01-16",
    lessonTime: "18:30 – 19:15",
    lessonType: "in-person",
    lessonStatus: "completed",
    participantName: "Maria Lopez",
    instrument: "Piano",
  },
  {
    id: "3",
    lessonDate: "2026-01-13",
    lessonTime: "18:30 – 19:15",
    lessonType: "in-person",
    lessonStatus: "completed",
    participantName: "Maria Lopez",
    instrument: "Piano",
  },
  {
    id: "4",
    lessonDate: "2026-01-16",
    lessonTime: "14:00 – 14:45",
    lessonType: "hybrid",
    lessonStatus: "cancelled",
    participantName: "Daniel Kim",
    instrument: "Violin",
  },
  {
    id: "5",
    lessonDate: "2026-01-18",
    lessonTime: "17:00 – 17:45",
    lessonType: "online",
    lessonStatus: "scheduled",
    participantName: "Hannah Lee",
    instrument: "Piano",
  },
];

export const exercises: Exercise[] = [
  {
    id: "ex-1",
    title: "Basic Chord Transitions",
    instrument: "Guitar",
    difficulty: "beginner",
    goal: "Smooth G–C–D chord changes with steady tempo.",
    targetPerWeek: 3,
    practicedDaysThisWeek: ["Mon", "Sat", "Wed"],
  },
  {
    id: "ex-2",
    title: "Major Scale Practice",
    instrument: "Piano",
    difficulty: "beginner",
    goal: "Play C major scale (2 octaves) evenly with metronome.",
    targetPerWeek: 5,
    practicedDaysThisWeek: ["Mon", "Wed", "Thu", "Sat"],
  },
  {
    id: "ex-3",
    title: "Bowing Technique Drills",
    instrument: "Violin",
    difficulty: "intermediate",
    goal: "Straight bowing + consistent pressure on open strings.",
    targetPerWeek: 3,
    practicedDaysThisWeek: [],
  },
  {
    id: "ex-4",
    title: "Rhythm Control Exercises",
    instrument: "Drums",
    difficulty: "advanced",
    goal: "Subdivisions with click (8ths/16ths) for timing control.",
    targetPerWeek: 1,
    practicedDaysThisWeek: ["Tue"],
  },
];

const StudentDashboardPage = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "student";
  const summary = getPracticeSummary({ lessons, exercises });
  return (
    <Main>
      <div>Student Dashboard Page - authenticated student`s dashboard</div>
      <HeaderSection {...studentsDashboard.header} />
      <WeekCalendar lessons={lessons} currentRole={role} />
      <Section>
        <h2 className="font-bold text-xl">Next Lesson</h2>
        <LessonCard currentRole={role} {...lessons[0]} isUpcomingCard={true} />
      </Section>
      <Section>
        <h2 className="font-bold text-xl">Exercises</h2>
        <div className="flex flex-wrap gap-4">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </Section>
      <PracticeSummary summary={summary} />
    </Main>
  );
};

export default StudentDashboardPage;
