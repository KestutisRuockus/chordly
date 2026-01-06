import SearchInput from "@/components/SearchInput";
import TeacherCard from "@/components/teachers/TeacherSummaryCard";
import { getTeachersSummary, getTeachersSummaryByQuery } from "@/db/teachers";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const FindTeachersPage = async ({ searchParams }: Props) => {
  const { q } = await searchParams;
  const allTeachers = q
    ? await getTeachersSummaryByQuery(q)
    : await getTeachersSummary();
  return (
    <section className="flex flex-col gap-8 items-center my-8">
      <SearchInput />
      <h2>Teachers List:</h2>
      {allTeachers.length === 0 && <p>No teachers found</p>}
      {allTeachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </section>
  );
};

export default FindTeachersPage;
