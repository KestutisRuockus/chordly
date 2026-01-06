import TeacherCard from "@/components/teachers/TeacherSummaryCard";
import { getTeachersSummary } from "@/db/teachers";

const FindTeachersPage = async () => {
  const allTeachers = await getTeachersSummary();
  return (
    <section className="flex flex-col gap-8 items-center my-8">
      <h2>Teachers List:</h2>
      {allTeachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </section>
  );
};

export default FindTeachersPage;
