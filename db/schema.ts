import {
  pgTable,
  text,
  timestamp,
  uuid,
  json,
  numeric,
  integer,
} from "drizzle-orm/pg-core";

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
  lessonType: text("lesson_type").notNull(),
  location: text("location"),
  bio: text("bio").notNull(),
  experience: text("experience"),
  hourlyRate: numeric("hourly_rate", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  lessonType: text("lesson_type").notNull(),
  location: text("location"),
  skillLevel: text("skill_level").notNull(),
  bio: text("bio"),
  age: integer("age"),
});
