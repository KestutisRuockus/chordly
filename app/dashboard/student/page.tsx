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
import { getStudentDbIdByClerkId } from "@/db/students";
import { getExercisesByStudentId } from "@/db/exercises";
import { getAllLessonsByRoleAndId } from "@/db/lesson";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import { getNextUpcomingLesson } from "@/lib/lessons";
import { addDays, getDateRange } from "@/lib/date";
import { CALENDAR_RANGE_DAYS } from "@/lib/constants";

type Props = {
  searchParams?: Promise<{ offset?: string }>;
};

const StudentDashboardPage = async ({ searchParams }: Props) => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "student";
  const studentId = await getStudentDbIdByClerkId(userId);

  const queryParams = (await searchParams) ?? {};
  const offsetFromUrl = Number(queryParams.offset ?? 0);
  const offsetWeeks = Number.isFinite(offsetFromUrl) ? offsetFromUrl : 0;

  const anchor = addDays(new Date(), offsetWeeks * CALENDAR_RANGE_DAYS);
  const { fromDate, toDate } = getDateRange(anchor, CALENDAR_RANGE_DAYS);

  const lessons = await getAllLessonsByRoleAndId({
    role,
    id: studentId,
    fromDate,
    toDate,
  });
  const nextLesson = getNextUpcomingLesson(lessons);

  const teacherIds = Array.from(
    new Set(lessons.map((lesson) => lesson.teacherId)),
  );

  const scheduleEntries = await Promise.all(
    teacherIds.map(async (teacherId) => {
      const schedule = await getTeacherWeeklySchedule(teacherId);
      return [teacherId, schedule] as const;
    }),
  );

  const scheduleByTeacherId: TeacherScheduleByTeacherId =
    Object.fromEntries(scheduleEntries);

  const exercises = await getExercisesByStudentId(studentId);
  const summary = getPracticeSummary({ lessons, exercises });
  return (
    <Main>
      <HeaderSection {...studentsDashboard.header} />
      <WeekCalendar
        lessons={lessons}
        currentRole={role}
        scheduleByTeacherId={scheduleByTeacherId}
        fromDate={fromDate}
        offsetWeeks={offsetWeeks}
      />
      <div className="flex justify-center gap-4 w-[85%] mx-auto border py-6">
        {nextLesson && (
          <Section>
            <h2 className="font-bold text-xl">Next Lesson</h2>
            <LessonCard
              currentRole={role}
              {...nextLesson}
              isUpcomingCard={true}
              teacherWeeklySchedule={scheduleByTeacherId[nextLesson.teacherId]}
            />
          </Section>
        )}
        {exercises.length > 0 ? (
          <Section className="max-1/2 overflow-x-auto">
            <h2 className="font-bold text-xl">Exercises</h2>
            <div className="flex flex-wrap gap-4">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  studentId={studentId}
                />
              ))}
            </div>
          </Section>
        ) : (
          <Section>
            <h2 className="font-bold text-xl">There is no exercises</h2>
          </Section>
        )}
        <PracticeSummary summary={summary} />
      </div>
    </Main>
  );
};

export default StudentDashboardPage;
