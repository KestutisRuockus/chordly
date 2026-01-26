import { LessonRow } from "@/db/types";

export const getNextUpcomingLesson = (lessons: LessonRow[]) => {
  const now = new Date();

  const currentDate = now.toISOString().slice(0, 10);
  const currentHour = now.getHours();

  const upcomingLessons = lessons
    .filter((lesson) => lesson.lessonStatus !== "cancelled")
    .filter(
      (lesson) =>
        lesson.lessonDate > currentDate ||
        (lesson.lessonDate === currentDate && lesson.lessonHour > currentHour),
    )
    .sort((a, b) => {
      if (a.lessonDate !== b.lessonDate) {
        return a.lessonDate.localeCompare(b.lessonDate);
      }
      return a.lessonHour - b.lessonHour;
    });

  return upcomingLessons[0] ?? null;
};
