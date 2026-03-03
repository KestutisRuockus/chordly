import type { RoleType } from "@/types/role";
import type { TeacherWeeklySchedule } from "@/components/teacherSchedule/types";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import BackButton from "@/components/ui/BackButton";
import LessonCard from "@/components/dashboard/LessonCard";
import ExerciseCard from "@/components/dashboard/ExerciseCard";
import { getPracticeSummary } from "@/components/dashboard/helpers/getPracticeSummary";
import PracticeSummary from "@/components/dashboard/PracticeSummary";
import StudentProfileActions from "@/components/dashboard/StudentProfileActions";
import Note from "@/components/dashboard/Note";
import {
  getFormerStudentsIdsList,
  getTeacherInstrumentsList,
  requireTeacherId,
} from "@/db/teachers";
import { getTeacherNotes } from "@/db/teacherNotes";
import { getExercisesByTeacherAndStudent } from "@/db/exercises";
import {
  getAllLessonsByRoleAndId,
  getUpcomingLessonsForTeacherStudent,
} from "@/db/lesson";
import { currentUser } from "@clerk/nextjs/server";
import { DEFAULT_OFFSET_DAYS } from "@/lib/constants";
import { addDays, getDateRange } from "@/lib/date";
import { getTeacherWeeklySchedule } from "@/db/teacherSchedule";
import { getStudentById } from "@/db/students";
import DeactivateStudent from "@/components/deactiveStudent/DeactivateStudent";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import DescriptionList from "@/components/ui/DescriptionList";
import SubHeading from "@/components/ui/SubHeading";

type Props = {
  params: { id: string };
};

const StudentFullProfileById = async ({ params }: Props) => {
  const { id: studentId } = await params;
  const student = await getStudentById(studentId);

  if (!student) {
    return <Main>Student not found</Main>;
  }

  const user = await currentUser();
  const role = (user?.publicMetadata?.role as RoleType) ?? "teacher";

  const teacherId = await requireTeacherId();

  const teacherWeeklySchedule: TeacherWeeklySchedule =
    await getTeacherWeeklySchedule(teacherId);

  const anchor = addDays(new Date(), DEFAULT_OFFSET_DAYS);
  const { fromDate, toDate } = getDateRange(anchor, 7);
  const teacherLessons = await getAllLessonsByRoleAndId({
    role,
    id: teacherId,
    fromDate,
    toDate,
  });

  const relatedLessons = teacherLessons.filter(
    (lesson) =>
      lesson.teacherId === teacherId && lesson.studentId === studentId,
  );

  const [
    relatedNotes,
    relatedExercises,
    formerStudentIdsList,
    teacherInstrumentsList,
  ] = await Promise.all([
    getTeacherNotes({ teacherId, studentId }),
    getExercisesByTeacherAndStudent({ teacherId, studentId }),
    getFormerStudentsIdsList(teacherId),
    getTeacherInstrumentsList(teacherId),
  ]);
  const isFormerStudent = formerStudentIdsList.includes(studentId);

  const [upcomingLessons, lastLessons, teacherBookedSlots] = await Promise.all([
    getUpcomingLessonsForTeacherStudent({
      teacherId,
      studentId,
      direction: "next",
    }),
    getUpcomingLessonsForTeacherStudent({
      teacherId,
      studentId,
      direction: "prev",
    }),
    getAllLessonsByRoleAndId({
      role: "teacher",
      id: teacherId,
      fromDate,
      toDate,
    }),
  ]);

  const summary = getPracticeSummary({
    lessons: relatedLessons,
    exercises: relatedExercises,
  });

  return (
    <Main className=" lg:w-11/12 2xl:w-4/5">
      <BackButton text="Back to dashboard" />
      <Section className="w-full grid grid-cols-5 gap-4 border-0 bg-background shadow-md">
        <aside
          aria-label="Student profile"
          className="border rounded-lg bg-card shadow-sm p-4 col-span-5 lg:col-span-2"
        >
          <div className="flex flex-col-reverse md:flex-row lg:flex-col-reverse xl:flex-row items-center md:items-start lg:item-center xl:items-start justify-between gap-1 p-2 mb-4">
            <div className="flex flex-col gap-1 w-full lg:w-full xl:w-1/2">
              <DescriptionList label={"Name"} value={student.fullName} />
              <DescriptionList
                label={"Email"}
                value={student.email ?? "N/A"}
                isCapitalized={false}
              />
              <DescriptionList label={"Age"} value={student?.age ?? "N/A"} />
              <DescriptionList
                label={"Skill level"}
                value={student?.skillLevel ?? "N/A"}
              />
              <DescriptionList
                label={"Bio"}
                value={student?.bio ?? "N/A"}
                isCapitalized={false}
              />
              <DescriptionList
                label={"Location"}
                value={student?.location ?? "N/A"}
              />
            </div>
            <ProfileAvatar
              avatarUrl={student.avatarUrl}
              fullName={student.fullName}
              showName={false}
            />
          </div>
          <PracticeSummary summary={summary} showFullSummary={false} />
          <div className="w-full flex justify-between items-center">
            <StudentProfileActions
              studentId={studentId}
              teacherInstrumentsList={teacherInstrumentsList}
            />
          </div>
          <DeactivateStudent
            teacherId={teacherId}
            studentId={studentId}
            disabled={isFormerStudent}
          />
        </aside>
        <div className="flex flex-col gap-4 col-span-5 lg:col-span-3 bg-card shadow-sm p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-2 overflow-x-auto">
            {relatedNotes.map((note) => (
              <Note key={note.id} note={note} studentId={studentId} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-col gap-4">
            <>
              <SubHeading
                subHeading="Your Next 3 Lessons"
                textCentered={false}
              />
              <div className="flex gap-2 flex-wrap">
                {upcomingLessons.length ? (
                  upcomingLessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      currentRole={role}
                      {...lesson}
                      teacherWeeklySchedule={teacherWeeklySchedule}
                      teacherBookedSlots={teacherBookedSlots}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No upcoming lessons
                  </p>
                )}
              </div>
            </>
            <>
              <SubHeading
                subHeading="Your Last 3 Lessons"
                textCentered={false}
              />
              <div className="flex gap-2 flex-wrap">
                {lastLessons.length ? (
                  lastLessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      currentRole={role}
                      {...lesson}
                      teacherWeeklySchedule={teacherWeeklySchedule}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No past lessons
                  </p>
                )}
              </div>
            </>
          </div>
          <>
            <SubHeading
              subHeading="Your Assigned Exercises"
              textCentered={false}
            />
            <div className="flex gap-2 overflow-x-auto">
              {relatedExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  isStudent={false}
                  studentId={student.id}
                />
              ))}
            </div>
          </>
        </div>
      </Section>
    </Main>
  );
};

export default StudentFullProfileById;
