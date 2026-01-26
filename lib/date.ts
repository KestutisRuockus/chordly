import { WeekDay } from "@/app/dashboard/types";
import { WeekDayNumber } from "@/components/teacherSchedule/types";
import { LESSON_LENGTH } from "./constants";

export const WEEK_DAYS: WeekDay[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const DAY_MAP: WeekDay[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getMonday = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getToday = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const getTodayWeekDay = (date: Date = new Date()): WeekDay => {
  const jsDay = date.getDay();
  return DAY_MAP[jsDay];
};

export const getWeekDayFromDate = (date = new Date()): WeekDay => {
  const jsDay = date.getDay();
  return DAY_MAP[jsDay];
};

export const getLessonDateFromWeekday = (weekday: number) => {
  const now = new Date();
  const monday = getMonday(now);

  const d = new Date(monday);
  d.setDate(monday.getDate() + weekday);

  return formatDateKey(d);
};

export const formatLessonTime = (hour: number) => {
  const start = String(hour).padStart(2, "0");
  return `${start}:00 - ${start}:${LESSON_LENGTH}`;
};

export const getWeekdayNumberFromDateString = (
  dateStr: string,
): WeekDayNumber => {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);

  const jsDay = date.getDay();
  return ((jsDay + 6) % 7) as WeekDayNumber;
};

export const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

export const getDateRange = (anchor: Date, days: number) => {
  const start = getToday(anchor);
  const end = addDays(start, days - 1);

  return { fromDate: formatDateKey(start), toDate: formatDateKey(end) };
};
