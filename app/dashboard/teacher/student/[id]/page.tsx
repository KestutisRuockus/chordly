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
import { requireTeacherId } from "@/db/teachers";
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

  const [relatedNotes, relatedExercises] = await Promise.all([
    getTeacherNotes({ teacherId, studentId }),
    getExercisesByTeacherAndStudent({ teacherId, studentId }),
  ]);

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
    <Main>
      <BackButton text="Back to dashboard" />
      <h1 className="text-3xl font-bold mx-auto">
        {student?.fullName} Profile
      </h1>
      <Section className="w-full grid grid-cols-4 gap-4 border-0">
        <aside className="border rounded-lg bg-slate-300 p-4">
          <div className="flex flex-col gap-1  p-2 col-span-1 mb-4">
            <p>
              Name:{" "}
              <span className="text-sm italic capitalize">
                {student.fullName}
              </span>
            </p>
            <p>
              Email: <span className="text-sm italic">{student.email}</span>
            </p>
            <p>
              Age:{" "}
              <span className="text-sm italic capitalize">{student.age}</span>
            </p>
            <p>
              Skill Level:{" "}
              <span className="text-sm italic capitalize">
                {student.skillLevel}
              </span>
            </p>
            <p>
              Lesson Type:{" "}
              <span className="text-sm italic capitalize">
                {student.lessonType}
              </span>
            </p>
            <p>
              Bio:{" "}
              <span className="text-sm italic capitalize">{student.bio}</span>
            </p>
            <p>
              Location:{" "}
              <span className="text-sm italic capitalize">
                {student.location}
              </span>
            </p>
          </div>
          <PracticeSummary summary={summary} showFullSummary={false} />
          <div className="w-full flex justify-between items-center">
            <StudentProfileActions studentId={studentId} />
          </div>
          <DeactivateStudent teacherId={teacherId} studentId={studentId} />
        </aside>
        <div className="flex flex-col gap-4 col-span-3 bg-slate-300 p-4 rounded-lg">
          <div className="flex gap-2">
            {relatedNotes.map((note) => (
              <Note key={note.id} note={note} studentId={studentId} />
            ))}
          </div>
          <div className="flex gap-20">
            <div>
              <h3 className="font-semibold mb-2">Upcoming lessons</h3>
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
                  <p className="text-sm text-gray-600">No upcoming lessons</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Lesson history</h3>
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
                  <p className="text-sm text-gray-600">No past lessons</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {relatedExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isStudent={false}
                studentId={student.id}
              />
            ))}
          </div>
        </div>
      </Section>
    </Main>
  );
};

export default StudentFullProfileById;
