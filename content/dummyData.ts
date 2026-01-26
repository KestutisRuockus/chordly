import type { StudentProfile, StudentSummary } from "../app/dashboard/types";

export const studentsSummaries: StudentSummary[] = [
  {
    id: "172c4029-a1ef-4684-9748-bb334994f8d7",
    name: "Demo Student",
    instrument: "Guitar",
    lessonType: "hybrid",
  },
  {
    id: "5c212784-da06-48b7-be14-c79b81761188",
    name: "James Rodriguez",
    instrument: "Piano",
    lessonType: "in-person",
  },
  {
    id: "7bfba22e-f8c1-4ae2-8dd4-f42739be7521",
    name: "Sophia Nguyen",
    instrument: "Violin",
    lessonType: "online",
  },
  {
    id: "31c08aa8-2893-463a-aab1-1b22e0712f89",
    name: "Kestis Test",
    instrument: "Drums",
    lessonType: "hybrid",
  },
];

export const students: StudentProfile[] = [
  {
    id: "172c4029-a1ef-4684-9748-bb334994f8d7",
    name: "Demo Student",
    instrument: "Guitar",
    lessonType: "hybrid",
    email: "demo.student@demo.com",
    location: "Kaunas",
    skillLevel: "beginner",
    bio: "Self-taught guitarist focusing on blues and rock. Looking for structured lessons to improve improvisation and timing.",
    age: 22,
  },
  {
    id: "5c212784-da06-48b7-be14-c79b81761188",
    name: "James Rodriguez",
    instrument: "Piano",
    lessonType: "in-person",
    email: "james.rodriguez@demo.com",
    location: "Vilnius",
    skillLevel: "intermediate",
    bio: "Learning piano and wants to build a strong foundation in reading sheet music and basic technique.",
    age: 19,
  },
  {
    id: "7bfba22e-f8c1-4ae2-8dd4-f42739be7521",
    name: "Sophia Nguyen",
    instrument: "Violin",
    lessonType: "online",
    email: "sophia.nguyen@demo.com",
    location: "Klaipėda",
    skillLevel: "advanced",
    bio: "Played violin for several years. Preparing for performances and aiming to polish intonation and articulation.",
    age: 27,
  },
  {
    id: "31c08aa8-2893-463a-aab1-1b22e0712f89",
    name: "Kestis Test",
    instrument: "Drums",
    lessonType: "hybrid",
    email: "test.kestis@gmail.com",
    location: "Kaunas",
    skillLevel: "beginner",
    bio: "Drummer with experience in band rehearsals. Wants to improve groove, fills, and independence for live gigs.",
    age: 21,
  },
];
