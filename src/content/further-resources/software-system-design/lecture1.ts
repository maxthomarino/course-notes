import type { LectureResources } from "../types";

const lecture1: LectureResources = {
  courseSlug: "software-system-design",
  lectureId: "lecture1",
  lectureTitle: "OO Design & UML Methodology",
  sessions: [
    {
      title: "Session 1: What is Software Systems Design About?",
      topics: [
        {
          name: "Software Systems Design Intro",
          resources: [
            {
              title: "Software Design — Wikipedia",
              url: "https://en.wikipedia.org/wiki/Software_design",
              description:
                "Overview of software design concepts, processes, and principles.",
              type: "article",
            },
            {
              title: "SWEBOK — IEEE",
              url: "https://www.computer.org/education/bodies-of-knowledge/software-engineering",
              description:
                "The Software Engineering Body of Knowledge, the IEEE standard for the field.",
              type: "specification",
            },
          ],
        },
        {
          name: "Requirements Engineering",
          resources: [
            {
              title: "Requirements Engineering — Wikipedia",
              url: "https://en.wikipedia.org/wiki/Requirements_engineering",
              description:
                "Comprehensive overview of the requirements engineering process.",
              type: "article",
            },
            {
              title: "Verification vs Validation — ISTQB",
              url: "https://www.istqb.org/",
              description:
                "Understanding the difference between verification and validation in software testing.",
              type: "article",
            },
          ],
        },
        {
          name: "Systems Thinking",
          resources: [
            {
              title: "Systems Thinking — MIT Sloan",
              url: "https://mitsloan.mit.edu/ideas-made-to-matter/systems-thinking",
              description:
                "Introduction to systems thinking from MIT Sloan Management Review.",
              type: "article",
            },
            {
              title: "Donella Meadows Systems Thinking Resources",
              url: "https://donellameadows.org/systems-thinking-resources/",
              description:
                "Curated resources on systems thinking from the Donella Meadows Project.",
              type: "article",
            },
          ],
        },
        {
          name: "Software Design Challenges",
          resources: [
            {
              title: "No Silver Bullet — Fred Brooks",
              url: "https://en.wikipedia.org/wiki/No_Silver_Bullet",
              description:
                "Brooks' seminal 1986 paper on the essential difficulties of software engineering.",
              type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Session 2: Key OO Concepts Adopted by UML",
      topics: [
        {
          name: "OO Paradigm",
          resources: [
            {
              title: "Object-Oriented Programming — Wikipedia",
              url: "https://en.wikipedia.org/wiki/Object-oriented_programming",
              description:
                "Comprehensive overview of OOP concepts including classes, objects, and messaging.",
              type: "article",
            },
            {
              title: "SOLID Principles — DigitalOcean",
              url: "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design",
              description:
                "Practical tutorial covering all five SOLID principles with examples.",
              type: "tutorial",
            },
          ],
        },
        {
          name: "Abstraction & Encapsulation",
          resources: [
            {
              title: "Abstraction in OOP — GeeksforGeeks",
              url: "https://www.geeksforgeeks.org/abstraction-in-java-2/",
              description:
                "Explains abstraction and encapsulation with Java code examples.",
              type: "tutorial",
            },
            {
              title: "OO Concepts — Oracle Java Tutorials",
              url: "https://docs.oracle.com/javase/tutorial/java/concepts/",
              description:
                "Official Oracle tutorials covering core object-oriented concepts in Java.",
              type: "documentation",
            },
          ],
        },
        {
          name: "Inheritance & Polymorphism",
          resources: [
            {
              title: "Inheritance — Wikipedia",
              url: "https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)",
              description:
                "Covers single, multiple, and multilevel inheritance with language comparisons.",
              type: "article",
            },
            {
              title: "Design Patterns Intro — Refactoring Guru",
              url: "https://refactoring.guru/design-patterns",
              description:
                "Visual introduction to design patterns that leverage inheritance and polymorphism.",
              type: "tutorial",
            },
          ],
        },
        {
          name: "UML in OO Design",
          resources: [
            {
              title: "UML Spec v2.5.1 — OMG",
              url: "https://www.omg.org/spec/UML/",
              description:
                "The official UML specification from the Object Management Group.",
              type: "specification",
            },
            {
              title: "UML 2.5 Diagram Types — uml-diagrams.org",
              url: "https://www.uml-diagrams.org/uml-25-diagrams.html",
              description:
                "Reference for all 14 UML 2.5 diagram types with descriptions.",
              type: "article",
            },
            {
              title: "UML Introduction — Lucidchart",
              url: "https://www.lucidchart.com/pages/what-is-UML-unified-modeling-language",
              description:
                "Beginner-friendly introduction to UML with interactive diagram examples.",
              type: "tutorial",
            },
          ],
        },
      ],
    },
    {
      title: "Session 3: UML Methodology and UML Techniques",
      topics: [
        {
          name: "Use Case Diagrams",
          resources: [
            {
              title: "Use Case Tutorial — Visual Paradigm",
              url: "https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/",
              description:
                "Step-by-step tutorial on creating use case diagrams.",
              type: "tutorial",
            },
            {
              title: "Use Case Reference — uml-diagrams.org",
              url: "https://www.uml-diagrams.org/use-case-diagrams.html",
              description:
                "Detailed reference on use case diagram notation and semantics.",
              type: "article",
            },
          ],
        },
        {
          name: "Activity Diagrams",
          resources: [
            {
              title: "Activity Diagram Reference — uml-diagrams.org",
              url: "https://www.uml-diagrams.org/activity-diagrams.html",
              description:
                "Complete reference for activity diagram elements and notation.",
              type: "article",
            },
            {
              title: "Activity Diagram Tutorial — Lucidchart",
              url: "https://www.lucidchart.com/pages/uml-activity-diagram",
              description:
                "Interactive guide to creating activity diagrams with examples.",
              type: "tutorial",
            },
          ],
        },
        {
          name: "Class Diagrams",
          resources: [
            {
              title: "Class Diagram Reference — uml-diagrams.org",
              url: "https://www.uml-diagrams.org/class-diagrams-overview.html",
              description:
                "Comprehensive reference for class diagram notation and relationships.",
              type: "article",
            },
            {
              title: "Class Diagram Tutorial — Visual Paradigm",
              url: "https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-class-diagram/",
              description:
                "Practical tutorial on designing class diagrams with examples.",
              type: "tutorial",
            },
          ],
        },
        {
          name: "State Transition Diagrams",
          resources: [
            {
              title: "State Machine Reference — uml-diagrams.org",
              url: "https://www.uml-diagrams.org/state-machine-diagrams.html",
              description:
                "Reference for state machine diagram elements and transitions.",
              type: "article",
            },
          ],
        },
        {
          name: "Sequence Diagrams",
          resources: [
            {
              title: "Sequence Diagram Reference — uml-diagrams.org",
              url: "https://www.uml-diagrams.org/sequence-diagrams.html",
              description:
                "Complete reference for sequence diagram lifelines, messages, and fragments.",
              type: "article",
            },
            {
              title: "Sequence Diagram Tutorial — Lucidchart",
              url: "https://www.lucidchart.com/pages/uml-sequence-diagram",
              description:
                "Beginner-friendly tutorial on creating sequence diagrams.",
              type: "tutorial",
            },
          ],
        },
        {
          name: "Five-Step Process",
          resources: [
            {
              title: "UML Distilled — Martin Fowler (book page)",
              url: "https://martinfowler.com/books/uml.html",
              description:
                "Fowler's concise guide to UML, including practical modelling processes.",
              type: "book",
            },
            {
              title: "Applying UML — Craig Larman (book page)",
              url: "https://www.craiglarman.com/wiki/index.php?title=Book_Applying_UML_and_Patterns",
              description:
                "Larman's textbook on iterative OO analysis and design with UML.",
              type: "book",
            },
          ],
        },
        {
          name: "Three-Tier Architecture",
          resources: [
            {
              title: "Multitier Architecture — Wikipedia",
              url: "https://en.wikipedia.org/wiki/Multitier_architecture",
              description:
                "Overview of multi-tier (n-tier) architecture patterns in software design.",
              type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Recommended Textbooks",
      topics: [
        {
          name: "Course Textbooks",
          resources: [
            {
              title: "UML Distilled — Fowler",
              url: "https://martinfowler.com/books/uml.html",
              description:
                "A Brief Guide to the Standard Object Modeling Language (3rd Edition).",
              type: "book",
            },
            {
              title: "Applying UML and Patterns — Larman",
              url: "https://www.craiglarman.com/wiki/index.php?title=Book_Applying_UML_and_Patterns",
              description:
                "An Introduction to Object-Oriented Analysis and Design and Iterative Development (3rd Edition).",
              type: "book",
            },
            {
              title: "Software Engineering — Pressman & Maxim",
              url: "https://www.mheducation.com/highered/product/software-engineering-practitioner-s-approach-pressman-maxim/M9781259872976.html",
              description:
                "A Practitioner's Approach (9th Edition) — comprehensive SE textbook.",
              type: "book",
            },
            {
              title: "Software Engineering — Sommerville",
              url: "https://software-engineering-book.com/",
              description:
                "Classic textbook covering all major areas of software engineering (10th Edition).",
              type: "book",
            },
            {
              title: "The Unified Modeling Language User Guide — Booch, Rumbaugh, Jacobson",
              url: "https://www.informit.com/store/unified-modeling-language-user-guide-9780321267979",
              description:
                "Definitive guide to UML by its original creators (2nd Edition).",
              type: "book",
            },
            {
              title: "Design Patterns — Gamma, Helm, Johnson, Vlissides (GoF)",
              url: "https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-9780201633610",
              description:
                "Elements of Reusable Object-Oriented Software — the foundational patterns book.",
              type: "book",
            },
          ],
        },
      ],
    },
  ],
};

export default lecture1;
