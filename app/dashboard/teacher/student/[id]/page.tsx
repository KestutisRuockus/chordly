import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import BackButton from "@/components/ui/BackButton";
import LessonCard from "@/components/dashboard/LessonCard";
import ExerciseCard from "@/components/dashboard/ExerciseCard";
import { getPracticeSummary } from "@/components/dashboard/helpers/getPracticeSummary";
import PracticeSummary from "@/components/dashboard/PracticeSummary";
import {
  currentTeacherId,
  exercises,
  notes,
  students,
  teacherLessons,
} from "@/content/dummyData";
import StudentProfileModal from "@/components/dashboard/StudentProfileActions";
import Note from "@/components/dashboard/Note";

type Props = {
  params: { id: string };
};

const StudentFullProfileById = async ({ params }: Props) => {
  const { id } = await params;
  const student = students.find((student) => id === student.id);

  if (!student) {
    return <Main>Student not found</Main>;
  }

  const relatedLessons = teacherLessons.filter(
    (lesson) =>
      lesson.teacherId === currentTeacherId && lesson.studentId === id,
  );

  const relatedExercises = exercises.filter(
    (ex) => ex.teacherId === currentTeacherId && ex.studentId === id,
  );

  const summary = getPracticeSummary({
    lessons: relatedLessons,
    exercises: relatedExercises,
  });

  return (
    <Main>
      <BackButton text="Back to dashboard" />
      <h1 className="text-3xl font-bold mx-auto">{student?.name} Profile</h1>
      <Section className="w-full grid grid-cols-4 gap-4 border-0">
        <aside className="border rounded-lg bg-slate-300 p-4">
          <div className="flex flex-col gap-1  p-2 col-span-1 mb-4">
            <p>
              Name:{" "}
              <span className="text-sm italic capitalize">{student.name}</span>
            </p>
            <p>
              Email: <span className="text-sm italic">{student.email}</span>
            </p>
            <p>
              Age:{" "}
              <span className="text-sm italic capitalize">{student.age}</span>
            </p>
            <p>
              Instrument:{" "}
              <span className="text-sm italic capitalize">
                {student.instrument}
              </span>
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
            <StudentProfileModal />
          </div>
        </aside>
        <div className="flex flex-col gap-4 col-span-3 bg-slate-300 p-4 rounded-lg">
          <div className="flex gap-2">
            {notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
          <div className="flex gap-2">
            {relatedLessons.map((l) => (
              <LessonCard currentRole={"teacher"} key={l.id} {...l} />
            ))}
          </div>
          <div className="flex gap-2">
            {relatedExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isStudent={false}
              />
            ))}
          </div>
        </div>
      </Section>
    </Main>
  );
};

export default StudentFullProfileById;
