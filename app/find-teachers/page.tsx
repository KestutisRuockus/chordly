import InstrumentsFilter from "@/components/InstrumentsFilter";
import SearchInput from "@/components/SearchInput";
import TeacherCard from "@/components/teachers/TeacherSummaryCard";
import { getTeachersSummary, getTeachersSummaryByQuery } from "@/db/teachers";

type Props = {
  searchParams: Promise<{ q?: string; instruments?: string }>;
};

const parseInstrumentsToArray = (value?: string): string[] | undefined => {
  if (!value) {
    return;
  }

  const arr = value
    .split(",")
    .map((val) => val.trim())
    .filter(Boolean);

  return arr.length ? arr : undefined;
};

const FindTeachersPage = async ({ searchParams }: Props) => {
  const { q, instruments } = await searchParams;
  const parsedInstruments = parseInstrumentsToArray(instruments);
  const allTeachers =
    q || parsedInstruments
      ? await getTeachersSummaryByQuery(q, parsedInstruments)
      : await getTeachersSummary();
  return (
    <section className="flex flex-col gap-8 items-center my-8">
      <SearchInput />
      <InstrumentsFilter />
      <h2>Teachers List:</h2>
      {allTeachers.length === 0 && <p>No teachers found</p>}
      <div className="flex flex-wrap justify-center gap-6">
        {allTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </section>
  );
};

export default FindTeachersPage;
