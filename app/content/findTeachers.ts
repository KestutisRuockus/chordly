export const findTeachers = {
  header: {
    title: "Discover Music Teachers",
    description:
      "Explore qualified music teachers and book lessons that fit your goals.",
  },
  filters: {
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
  },
};
