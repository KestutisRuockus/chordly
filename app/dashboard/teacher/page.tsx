import type { RoleType } from "@/types/role";
import { teachersDashboard } from "@/content/teachersDashboard";
import LessonCard from "@/components/dashboard/LessonCard";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeaderSection from "@/components/sections/HeaderSection";
import { auth, currentUser } from "@clerk/nextjs/server";
import WeekCalendar from "@/components/dashboard/calendar/WeekCalendar";
import StudentSummaryCard from "@/components/dashboard/StudentSummaryCard";
import { studentsSummaries } from "@/content/dummyData";
import TeacherScheduleAction from "@/components/dashboard/TeacherScheduleAction";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import {
  TeacherScheduleByTeacherId,
  TeacherWeeklySchedule,
} from "@/components/teacherSchedule/types";
import { getTeacherDbIdByClerkId } from "@/db/teachers";
import { getAllLessonsByRoleAndId } from "@/db/lesson";
import { getNextUpcomingLesson } from "@/lib/lessons";
import { addDays, getDateRange } from "@/lib/date";
import { DEFAULT_OFFSET_DAYS } from "@/lib/constants";

const TeacherDashboardPage = async () => {
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

  const anchor = addDays(new Date(), DEFAULT_OFFSET_DAYS);
  const { fromDate, toDate } = getDateRange(anchor, 7);

  const teacherLessons = await getAllLessonsByRoleAndId({
    role,
    id: teachersDbId,
    fromDate,
    toDate,
  });
  const nextLesson = getNextUpcomingLesson(teacherLessons);

  const teacherWeeklySchedule: TeacherWeeklySchedule =
    await getTeacherWeeklySchedule(teachersDbId);

  const scheduleByTeacherId: TeacherScheduleByTeacherId = {
    [teachersDbId]: teacherWeeklySchedule,
  };

  return (
    <Main>
      <HeaderSection {...teachersDashboard.header} />
      <WeekCalendar
        lessons={teacherLessons}
        currentRole={role}
        scheduleByTeacherId={scheduleByTeacherId}
        fromDate={fromDate}
      />
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
      <Section>
        <h2 className="font-bold text-xl">Students</h2>
        <div className="flex flex-wrap gap-4">
          {studentsSummaries.map((student) => (
            <StudentSummaryCard key={student.id} student={student} />
          ))}
        </div>
      </Section>
      <TeacherScheduleAction
        buttonLabel={teachersDashboard.button.buttonLabel}
        teacherId={teachersDbId}
        teacherWeeklySchedule={teacherWeeklySchedule}
      />
    </Main>
  );
};

export default TeacherDashboardPage;
