import type { RoleType } from "@/types/role";
import type { TeacherScheduleByTeacherId } from "@/components/teacherSchedule/types";
import type { LessonRow } from "@/db/types";
import { teachersDashboard } from "@/content/teachersDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
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
import { CALENDAR_RANGE_DAYS } from "@/lib/constants";
import { getStudentSummaries } from "@/db/students";
import CallToActionCard from "@/components/ui/CallToActionCard";
import FormerRelationCard from "@/components/FormerRelationCard";

type Props = {
  searchParams?: Promise<{ offset?: string }>;
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
        <h2 className="text-center text-2xl mt-20">
          Choose a plan to start teaching
        </h2>
        <CallToActionCard buttonLabel={"See plans"} href={"/pricing"} />
      </Main>
    );
  }

  const queryParams = (await searchParams) ?? {};
  const offsetFromUrl = Number(queryParams.offset ?? 0);
  const offsetWeeks = Number.isFinite(offsetFromUrl) ? offsetFromUrl : 0;

  const anchor = addDays(new Date(), offsetWeeks * CALENDAR_RANGE_DAYS);
  const { fromDate, toDate } = getDateRange(anchor, CALENDAR_RANGE_DAYS);

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
    <Main>
      <HeaderSection {...teachersDashboard.header} />
      <WeekCalendar
        lessons={teacherLessons}
        currentRole={role}
        scheduleByTeacherId={scheduleByTeacherId}
        fromDate={fromDate}
        offsetWeeks={offsetWeeks}
        teacherBookedSlots={teacherBookedSlotsByTeacherId}
      />
      <div className="flex justify-center gap-4 w-[85%] mx-auto border py-6">
        {nextLesson && (
          <Section>
            <h2 className="font-bold text-xl">Next Lesson</h2>
            <LessonCard
              currentRole={role}
              {...nextLesson}
              isUpcomingCard={true}
              teacherWeeklySchedule={teacherWeeklySchedule}
            />
          </Section>
        )}
        {currentStudentsSummaries.length > 0 && (
          <Section>
            <h2 className="font-bold text-xl">Your students</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              {currentStudentsSummaries.map((student) => (
                <StudentSummaryCard key={student.id} student={student} />
              ))}
            </div>
          </Section>
        )}
        <TeacherScheduleAction
          buttonLabel={teachersDashboard.button.buttonLabel}
          teacherId={teachersDbId}
          teacherWeeklySchedule={teacherWeeklySchedule}
        />
      </div>
      {formerStudentsSummaries.length > 0 && (
        <Section>
          <h2 className="mb-2">Your former students</h2>
          <div className="flex gap-8">
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
