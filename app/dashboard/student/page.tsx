import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import type { RoleType } from "@/types/role";
import { studentsDashboard } from "@/content/studentsDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { auth, currentUser } from "@clerk/nextjs/server";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import ExerciseCard from "@/components/dashboard/ExerciseCard";
import PracticeSummary from "@/components/dashboard/PracticeSummary";
import { getPracticeSummary } from "@/components/dashboard/helpers/getPracticeSummary";
import {
  getFormerTeachersIdsList,
  getStudentDbIdByClerkId,
  getTeacherIdsList,
} from "@/db/students";
import { getExercisesByStudentId } from "@/db/exercises";
import {
  getAllLessonsByRoleAndId,
  getLastLessonsByTeachersIds,
} from "@/db/lesson";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import { getNextUpcomingLesson } from "@/lib/lessons";
import { addDays, getDateRange } from "@/lib/date";
import { getTeachersSummaryByIds } from "@/db/teachers";
import TeacherCard from "@/components/teachers/TeacherSummaryCard";
import FormerRelationCard from "@/components/FormerRelationCard";
import HeroSection from "@/components/sections/HeroSection";
import SubHeading from "@/components/ui/SubHeading";

type Props = {
  searchParams?: Promise<{ offset?: string; days?: string }>;
};

const StudentDashboardPage = async ({ searchParams }: Props) => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "student";
  const studentId = await getStudentDbIdByClerkId(userId);

  const queryParams = (await searchParams) ?? {};
  const offsetFromUrl = Number(queryParams.offset ?? 0);
  const days = Number(queryParams.days ?? 7);
  const offsetWeeks = Number.isFinite(offsetFromUrl) ? offsetFromUrl : 0;

  const anchor = addDays(new Date(), offsetWeeks * days);
  const { fromDate, toDate } = getDateRange(anchor, days);

  const lessons = await getAllLessonsByRoleAndId({
    role,
    id: studentId,
    fromDate,
    toDate,
  });
  const nextLesson = getNextUpcomingLesson(lessons);

  const [currentTeachersIds, formerTeachersIds] = await Promise.all([
    getTeacherIdsList(studentId),
    getFormerTeachersIdsList(studentId),
  ]);

  const [
    currentTeachersSummaries,
    formerTeachersSummaries,
    formerTeachersLastLessonsDates,
  ] = await Promise.all([
    getTeachersSummaryByIds(currentTeachersIds),
    getTeachersSummaryByIds(formerTeachersIds),
    getLastLessonsByTeachersIds(formerTeachersIds),
  ]);

  const scheduleEntries = await Promise.all(
    currentTeachersIds.map(async (teacherId) => {
      const schedule = await getTeacherWeeklySchedule(teacherId);
      return [teacherId, schedule] as const;
    }),
  );

  const scheduleByTeacherId: TeacherScheduleByTeacherId =
    Object.fromEntries(scheduleEntries);

  const bookedSlotsEntries = await Promise.all(
    currentTeachersIds.map(async (teacherId) => {
      const slots = await getAllLessonsByRoleAndId({
        role: "teacher",
        id: teacherId,
        fromDate,
        toDate,
      });
      return [teacherId, slots] as const;
    }),
  );

  const teacherBookedSlots = Object.fromEntries(bookedSlotsEntries);

  const exercises = await getExercisesByStudentId(studentId);
  const summary = getPracticeSummary({ lessons, exercises });
  return (
    <Main className={"2xl:w-11/12 lg:w-full"}>
      <HeroSection {...studentsDashboard.header} />
      <WeekCalendar
        lessons={lessons}
        currentRole={role}
        scheduleByTeacherId={scheduleByTeacherId}
        fromDate={fromDate}
        offsetWeeks={offsetWeeks}
        teacherBookedSlots={teacherBookedSlots}
      />
      <div className="flex flex-col sm:flex-row justify-center gap-4 mx-auto">
        {nextLesson && (
          <Section className="w-fit">
            <SubHeading subHeading="Next Lesson" textCentered={false} />
            <LessonCard
              currentRole={role}
              {...nextLesson}
              isUpcomingCard={true}
              teacherWeeklySchedule={scheduleByTeacherId[nextLesson.teacherId]}
            />
          </Section>
        )}
        <PracticeSummary summary={summary} />
      </div>
      {exercises.length > 0 ? (
        <Section className="max-1/2 overflow-x-auto">
          <h2 className="font-bold text-xl"></h2>
          <SubHeading subHeading="Exercises" />
          <div className="flex justify-center flex-wrap gap-4">
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
      {currentTeachersSummaries && (
        <Section>
          <SubHeading subHeading="Your Teachers" />
          <div className="flex flex-wrap gap-4 justify-center">
            {currentTeachersSummaries.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </Section>
      )}
      {formerTeachersSummaries.length !== 0 && (
        <Section>
          <SubHeading subHeading="Your former teachers" textCentered={false} />
          <div className="flex flex-wrap gap-4">
            {formerTeachersSummaries.map((teacher) => (
              <FormerRelationCard
                key={teacher.id}
                id={teacher.id}
                name={teacher.fullName}
                lastLessonDate={String(
                  formerTeachersLastLessonsDates[teacher.id],
                )}
                role={role}
              />
            ))}
          </div>
        </Section>
      )}
    </Main>
  );
};

export default StudentDashboardPage;
