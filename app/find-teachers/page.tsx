import LoadMoreButton from "@/components/ui/LoadMoreButton";
import InstrumentsFilter from "@/components/InstrumentsFilter";
import SearchInput from "@/components/SearchInput";
import TeacherCard from "@/components/teachers/TeacherSummaryCard";
import { getTeachersSummary, getTeachersSummaryByQuery } from "@/db/teachers";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { findTeachers } from "../../content/findTeachers";
import HeroSection from "@/components/sections/HeroSection";
import SubHeading from "@/components/ui/SubHeading";

type Props = {
  searchParams: Promise<{ q?: string; instruments?: string; limit?: string }>;
};

const DEFAULT_LIMIT = 5;

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

const parseLimit = (value?: string) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_LIMIT;
};

const FindTeachersPage = async ({ searchParams }: Props) => {
  const { q, instruments, limit } = await searchParams;

  const parsedInstruments = parseInstrumentsToArray(instruments);
  const parsedLimit = parseLimit(limit);
  const dbLimit = parsedLimit + 1;

  const allTeachers =
    q || parsedInstruments
      ? await getTeachersSummaryByQuery(q, parsedInstruments, dbLimit)
      : await getTeachersSummary(dbLimit);

  const hasMore = allTeachers.length > parsedLimit;
  const visibleTeachersList = allTeachers.slice(0, parsedLimit);

  return (
    <Main>
      <HeroSection {...findTeachers.header} />
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <Section className="flex flex-col gap-2 w-full md:max-w-64">
          <SearchInput />
          <InstrumentsFilter items={findTeachers.filters.items} />
        </Section>
        <Section>
          <SubHeading subHeading="Teachers:" textCentered={false} />
          {visibleTeachersList.length === 0 && <p>No teachers found</p>}
          <div className="flex flex-wrap justify-center gap-4 mt-1">
            {visibleTeachersList.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
          {hasMore && <LoadMoreButton />}
        </Section>
      </div>
    </Main>
  );
};

export default FindTeachersPage;
