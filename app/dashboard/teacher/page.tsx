import type { RoleType } from "@/types/role";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import type { LessonRow } from "@/db/types";
import { teachersDashboard } from "@/content/teachersDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { auth, currentUser } from "@clerk/nextjs/server";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import StudentSummaryCard from "@/components/dashboard/StudentSummaryCard";
import TeacherScheduleAction from "@/components/dashboard/TeacherScheduleAction";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import {
  getFormerStudentsIdsList,
  getStudentIdsList,
  getTeacherDbIdByClerkId,
  getTeacherPlan,
} from "@/db/teachers";
import {
  getAllLessonsByRoleAndId,
  getLastLessonsByStudentsIds,
} from "@/db/lesson";
import { getNextUpcomingLesson } from "@/lib/lessons";
import { addDays, getDateRange } from "@/lib/date";
import { getStudentSummaries } from "@/db/students";
import CallToActionCard from "@/components/ui/CallToActionCard";
import FormerRelationCard from "@/components/FormerRelationCard";
import Heading from "@/components/ui/Heading";
import CallToActionCardWrapper from "@/components/ui/CallToActionCardWrapper";
import HeroSection from "@/components/sections/HeroSection";
import SubHeading from "@/components/ui/SubHeading";

type Props = {
  searchParams?: Promise<{ offset?: string; days?: string }>;
};

const TeacherDashboardPage = async ({ searchParams }: Props) => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "teacher";
  const teachersDbId = await getTeacherDbIdByClerkId(userId);

  if (!teachersDbId) {
    return (
      <div className="p-6">
        Teacher profile not found in DB (no teacher record for this Clerk user).
      </div>
    );
  }

  const plan = await getTeacherPlan(teachersDbId);
  if (plan === "none") {
    return (
      <Main>
        <Section>
          <Heading heading="Choose a plan to start teaching" />
        </Section>
        <CallToActionCardWrapper>
          <CallToActionCard buttonLabel={"See plans"} href={"/pricing"} />
        </CallToActionCardWrapper>
      </Main>
    );
  }

  const queryParams = (await searchParams) ?? {};
  const offsetFromUrl = Number(queryParams.offset ?? 0);
  const days = Number(queryParams.days ?? 7);
  const offsetWeeks = Number.isFinite(offsetFromUrl) ? offsetFromUrl : 0;

  const anchor = addDays(new Date(), offsetWeeks * days);
  const { fromDate, toDate } = getDateRange(anchor, days);

  const [teacherWeeklySchedule, teacherLessons] = await Promise.all([
    getTeacherWeeklySchedule(teachersDbId),
    getAllLessonsByRoleAndId({
      role: role,
      id: teachersDbId,
      fromDate,
      toDate,
    }),
  ]);
  const nextLesson = getNextUpcomingLesson(teacherLessons);

  const scheduleByTeacherId: TeacherScheduleByTeacherId = {
    [teachersDbId]: teacherWeeklySchedule,
  };

  const teacherBookedSlotsByTeacherId: Record<string, LessonRow[]> = {
    [teachersDbId]: teacherLessons,
  };

  const [currentStudentIds, formerStudentIds] = await Promise.all([
    getStudentIdsList(teachersDbId),
    getFormerStudentsIdsList(teachersDbId),
  ]);
  const [
    currentStudentsSummaries,
    formerStudentsSummaries,
    formerStudentsLastLessonsDates,
  ] = await Promise.all([
    getStudentSummaries(currentStudentIds),
    getStudentSummaries(formerStudentIds),
    getLastLessonsByStudentsIds(formerStudentIds),
  ]);

  return (
    <Main className={"2xl:w-11/12 lg:w-full"}>
      <HeroSection {...teachersDashboard.header} />
      <TeacherScheduleAction
        buttonLabel={teachersDashboard.button.buttonLabel}
        teacherId={teachersDbId}
        teacherWeeklySchedule={teacherWeeklySchedule}
      />
      <WeekCalendar
        lessons={teacherLessons}
        currentRole={role}
        scheduleByTeacherId={scheduleByTeacherId}
        fromDate={fromDate}
        offsetWeeks={offsetWeeks}
        teacherBookedSlots={teacherBookedSlotsByTeacherId}
      />
      <div className="flex flex-col sm:flex-row justify-center gap-4 mx-auto">
        {nextLesson && (
          <Section className="w-fit">
            <SubHeading subHeading="Next Lesson" textCentered={false} />
            <LessonCard
              currentRole={role}
              {...nextLesson}
              isUpcomingCard={true}
              teacherWeeklySchedule={teacherWeeklySchedule}
            />
          </Section>
        )}
        {currentStudentsSummaries.length > 0 && (
          <Section className="w-4/5 sm:w-fit">
            <SubHeading subHeading="Your students" textCentered={days < 3} />
            <div className="flex flex-wrap gap-4 justify-start">
              {currentStudentsSummaries.map((student) => (
                <StudentSummaryCard key={student.id} student={student} />
              ))}
            </div>
          </Section>
        )}
      </div>
      {formerStudentsSummaries.length > 0 && (
        <Section>
          <SubHeading subHeading="Your former students" textCentered={false} />
          <div className="flex flex-wrap gap-4">
            {formerStudentsSummaries.map((student) => (
              <FormerRelationCard
                key={student.id}
                {...student}
                lastLessonDate={String(
                  formerStudentsLastLessonsDates[student.id],
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

export default TeacherDashboardPage;
