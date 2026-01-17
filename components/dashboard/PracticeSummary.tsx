import Section from "@/components/layout/Section";
import type { PracticeSummaryData } from "./helpers/getPracticeSummary";
import type { WeekDay } from "@/app/dashboard/types";
import { WEEK_DAYS } from "@/lib/date";

type Props = {
  summary: PracticeSummaryData;
};

const PracticeSummary = ({ summary }: Props) => {
  const practicedSet = new Set<WeekDay>(summary.practicedDays);

  return (
    <Section>
      <h2 className="font-bold text-xl mb-4">Current Week Practice Summary</h2>

      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-6 text-sm">
          <p>
            Lessons this week:{" "}
            <span className="font-semibold">{summary.lessonsThisWeek}</span>
          </p>

          <p>
            Practice days:{" "}
            <span className="font-semibold">{summary.practiceDaysCount}</span>/7
          </p>
        </div>
        <p className="text-sm">
          Weekly goals completed:{" "}
          <span className="font-semibold">
            {summary.completedExercisesThisWeek}/{summary.totalExercises}
          </span>
        </p>
        <div className="flex gap-2 justify-center items-center">
          {WEEK_DAYS.map((day) => {
            const practiced = practicedSet.has(day);

            return (
              <div key={day} className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500">{day}</span>
                <span
                  className={`w-3 h-3 rounded-sm border ${
                    practiced ? "bg-green-500 border-green-500" : "bg-gray-300"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default PracticeSummary;
