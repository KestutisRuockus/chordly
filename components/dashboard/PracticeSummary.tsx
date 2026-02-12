import Section from "@/components/layout/Section";
import type { PracticeSummaryData } from "./helpers/getPracticeSummary";
import type { WeekDay } from "@/app/dashboard/types";
import { WEEK_DAYS } from "@/lib/date";

type Props = {
  summary: PracticeSummaryData;
  showFullSummary?: boolean;
  dateRange: string;
};

const PracticeSummary = ({
  summary,
  showFullSummary = true,
  dateRange,
}: Props) => {
  const practicedSet = new Set<WeekDay>(summary.practicedDays);

  const lessonsLabel = showFullSummary
    ? "Lessons this week: "
    : "Lessons this week with you: ";
  const goalsLabel = showFullSummary
    ? "Weekly goals completed: "
    : "Goals completed (assigned by you): ";

  return (
    <Section>
      <div className="flex flex-col mb-4">
        <h2 className="font-bold text-xl text-center">
          Current Week Practice Summary
        </h2>
        <span className="text-center text-xs font-semibold">{dateRange}</span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-6 text-sm">
          <p>
            {lessonsLabel}
            <span className="font-semibold">{summary.lessonsThisWeek}</span>
          </p>
          {showFullSummary && (
            <p>
              Practice days:{" "}
              <span className="font-semibold">{summary.practiceDaysCount}</span>
              /7
            </p>
          )}
        </div>
        <p className="text-sm">
          {goalsLabel}
          <span className="font-semibold">
            {summary.completedExercisesThisWeek}/{summary.totalExercises}
          </span>
        </p>
        {showFullSummary && (
          <div className="flex gap-2 justify-center items-center">
            {WEEK_DAYS.map((day) => {
              const practiced = practicedSet.has(day);

              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">{day}</span>
                  <span
                    className={`w-3 h-3 rounded-sm border ${
                      practiced
                        ? "bg-green-500 border-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
};

export default PracticeSummary;
