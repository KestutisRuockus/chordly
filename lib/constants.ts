import type { TeacherPlan } from "@/db/types";

export const LESSON_LENGTH = 45;
export const DEFAULT_OFFSET_DAYS = 0;
export const CALENDAR_RANGE_DAYS = 7;
export const LESSONS_LOCK_HOURS = 2;
export const LOCK_TIME_MS = LESSONS_LOCK_HOURS * 60 * 60 * 1000;
export const TEACHER_PLAN_LIMITS: Record<TeacherPlan, number | null> = {
  none: 0,
  basic: 1,
  medium: 3,
  pro: null,
};
export const INSTRUMENTS_LIST = {
  sectionLabel: "Instruments type: ",
  items: [
    {
      instrumentType: "string",
      instruments: [
        "Guitar",
        "Acoustic Guitar",
        "Electric Guitar",
        "Bass Guitar",
        "Violin",
        "Viola",
        "Cello",
        "Double Bass",
      ],
    },
    {
      instrumentType: "Keyboard",
      instruments: ["Piano", "Keyboard", "Synthesizer"],
    },
    {
      instrumentType: "Wind",
      instruments: [
        "Flute",
        "Clarnet",
        "Saxophone",
        "Trumpet",
        "Trombone",
        "French Horn",
      ],
    },
    {
      instrumentType: "Percussion",
      instruments: ["Drums", "Percussion"],
    },
    {
      instrumentType: "Voice",
      instruments: ["Singing", "Vocal Coaching"],
    },
    {
      instrumentType: "Did not find your instrument?",
      instruments: ["Other"],
    },
  ],
};
