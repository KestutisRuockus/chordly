import type { LessonStatus, LessonType, WeekDay } from "@/app/dashboard/types";
import {
  pgTable,
  text,
  timestamp,
  uuid,
  json,
  numeric,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { TeacherPlan } from "./types";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teachers = pgTable("teachers", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  instruments: json("instruments").$type<string[]>().notNull(),
  lessonType: text("lesson_type").$type<LessonType>().notNull(),
  location: text("location"),
  bio: text("bio").notNull(),
  experience: text("experience"),
  hourlyRate: numeric("hourly_rate", { mode: "number" }).notNull(),
  studentIds: json("student_ids").$type<string[]>().notNull().default([]),
  formerStudentsIds: json("former_students_ids")
    .$type<string[]>()
    .notNull()
    .default([]),
  plan: text("plan").$type<TeacherPlan>().notNull().default("none"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  lessonType: text("lesson_type").$type<LessonType>().notNull(),
  location: text("location"),
  skillLevel: text("skill_level").notNull(),
  bio: text("bio"),
  age: integer("age"),
  teacherIds: json("teacher_ids").$type<string[]>().notNull().default([]),
  formerTeachersIds: json("former_teachers_ids")
    .$type<string[]>()
    .notNull()
    .default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const teacherAvailability = pgTable("teacher_availability", {
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => teachers.id, { onDelete: "cascade" })
    .primaryKey(),
  days: jsonb("days")
    .$type<Array<{ weekday: number; hours: number[] }>>()
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teacherNotes = pgTable("teacher_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => teachers.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const exercises = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => teachers.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  instrument: text("instrument").notNull(),
  difficulty: text("difficulty").notNull(),
  goal: text("goal").notNull(),
  targetPerWeek: integer("target_per_week").notNull(),
  practicedDaysThisWeek: jsonb("practiced_days_this_week")
    .$type<Array<WeekDay>>()
    .default([])
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => teachers.id, { onDelete: "cascade" }),
  lessonDate: text("lesson_date").notNull(),
  lessonHour: integer("lesson_hour").notNull(),
  lessonType: text("lesson_type").$type<LessonType>().notNull(),
  lessonStatus: text("lesson_status").$type<LessonStatus>().notNull(),
  instrument: text("instrument").notNull(),
  statusNote: text("status_note"),
  meetingUrl: text("meeting_url"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
