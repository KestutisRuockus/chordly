export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeeklyDaySchedule = {
  weekday: WeekDayNumber;
  hours: number[];
};

export type TeacherWeeklySchedule = {
  teacherId: string;
  lessonDurationMin: number;
  days: WeeklyDaySchedule[];
};
