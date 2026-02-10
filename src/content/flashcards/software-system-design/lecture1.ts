import type { LectureFlashcards } from "../types";

const lecture1: LectureFlashcards = {
  courseSlug: "software-system-design",
  lectureId: "lecture1",
  lectureTitle: "OO Design & UML Methodology",
  topics: [
    {
      name: "Software Systems Design Intro",
      cards: [
        {
          id: "q1",
          front: "What is the primary goal of software systems design?",
          back: "To define the architecture, components, interfaces, and behaviour of a system so that it satisfies specified requirements — bridging the gap between user needs and working software.",
        },
        {
          id: "q2",
          front:
            "What is the difference between 'building the system right' and 'building the right system'?",
          back: "'Building the system right' is verification — ensuring the software conforms to its specification. 'Building the right system' is validation — confirming the software addresses the user's real-world problem.",
        },
      ],
    },
    {
      name: "OO Paradigm",
      cards: [
        {
          id: "q3",
          front:
            "What are the four pillars of object-oriented programming?",
          back: "Abstraction, Encapsulation, Inheritance, and Polymorphism.",
        },
        {
          id: "q4",
          front: "What is encapsulation and why is it important?",
          back: "Encapsulation bundles data and methods into a single unit (class) while hiding internal state. It reduces coupling (external code depends only on the interface) and protects data integrity (access is controlled through methods).",
        },
      ],
    },
    {
      name: "UML Methodology",
      cards: [
        {
          id: "q5",
          front:
            "List the five steps of the UML methodology in order.",
          back: "1. Use Case Diagrams — adopt system scope\n2. Activity Diagrams — detail flow of events\n3. Class Diagrams — structure scoped data\n4. State Transition Diagrams — model object behaviour\n5. Sequence Diagrams — transform into functional workflows",
        },
        {
          id: "q6",
          front: "What four key activities does UML support?",
          back: "Specifying (precise definition), Visualising (comprehensible diagrams), Constructing (basis for code generation), and Documenting (recording design decisions).",
          hint: "Think about why UML exists as a language.",
        },
      ],
    },
  ],
};

export default lecture1;
