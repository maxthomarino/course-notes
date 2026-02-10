import type { LectureFlashcards } from "../types";

const lecture2: LectureFlashcards = {
  courseSlug: "software-system-design",
  lectureId: "lecture2",
  lectureTitle: "Use Case Diagrams",
  topics: [
    {
      name: "Session 1: Use Case Diagrams — Design Role",
      cards: [
        {
          id: "q1",
          front:
            "Why are use case diagrams considered the foundation of the UML methodology?",
          back: "They are Step 1 of the five-step methodology and their outputs — actors, use cases, events, flows, conditions, and information elements — feed directly into all subsequent steps (activity diagrams, class diagrams, state transition diagrams, and sequence diagrams). Errors at this stage propagate throughout the entire design.",
        },
        {
          id: "q2",
          front: "Who develops use case diagrams, and why is this collaborative?",
          back: "Systems analysts and end-users develop them together. Analysts bring modelling expertise and UML notation; end-users contribute domain knowledge and real requirements. This collaboration bridges the requirements gap between informal user language and precise technical models.",
        },
        {
          id: "q3",
          front:
            "List six purposes that use case diagrams serve in the software development lifecycle.",
          back: "1. Specifying and clarifying the system scope\n2. Identifying and capturing functional requirements\n3. Modelling user interactions\n4. Facilitating requirement prioritisation\n5. Guiding implementation\n6. Aiding in test case development",
        },
        {
          id: "q4",
          front:
            "What is the difference between a business use case and a system use case?",
          back: "Business use cases focus on organisational goals and business processes, with business actors such as departments or external organisations. System use cases focus on the automated functions of a software application, with application end-users and external systems as actors. This module focuses on system use cases.",
          hint: "Think about level of abstraction.",
        },
        {
          id: "q5",
          front:
            "How do use case diagrams and sequence diagrams complement each other at the system level?",
          back: "Use case diagrams capture what functional requirements the system must fulfil (a static, declarative view). Sequence diagrams capture how the functional workflow is carried out at runtime (a dynamic, procedural view). Together they provide a comprehensive specification of system behaviour.",
        },
      ],
    },
    {
      name: "Session 2: Core Concepts and Notations",
      cards: [
        {
          id: "q6",
          front:
            "What is the system boundary in a use case diagram, and what design function does it serve?",
          back: "The system boundary is a named rectangle that encloses all use cases belonging to the system. It explicitly defines the scope — what the system will and will not do — helping manage stakeholder expectations and prevent scope creep.",
        },
        {
          id: "q7",
          front: "What is a use case in UML, and what naming convention should be used?",
          back: "A use case is a specification of behaviour that represents a specific function the system performs in response to an actor's interaction. It must deliver observable value and describe a complete sequence from trigger to stable outcome. Use cases are named with verb–noun phrases, e.g. 'Make Order', 'Process Payment'.",
        },
        {
          id: "q8",
          front:
            "What is an actor in a use case diagram, and what three types of actor exist?",
          back: "An actor represents a role (not a specific individual) that interacts with the system. The three types are:\n1. Human user (e.g. customer, administrator)\n2. External system (e.g. payment gateway, email server)\n3. Hardware device (e.g. barcode scanner, sensor array)",
        },
        {
          id: "q9",
          front:
            "What is the difference between a primary actor and a secondary actor?",
          back: "A primary actor initiates the interaction with the system and has a goal the system helps achieve (e.g. a customer placing an order). A secondary (supporting) actor is called upon by the system during use case execution (e.g. a credit-checking service invoked when processing an order).",
        },
        {
          id: "q10",
          front:
            "List the four relationship types in a use case diagram and their notations.",
          back: "1. Association — solid line (actor ↔ use case)\n2. Generalisation — solid line with hollow arrowhead (inheritance between actors or use cases)\n3. «include» — dashed arrow with «include» label (mandatory sub-functionality)\n4. «extend» — dashed arrow with «extend» label (optional conditional behaviour)",
        },
        {
          id: "q11",
          front:
            "What is the difference between «include» and «extend» relationships?",
          back: "«include» denotes mandatory sub-functionality — the included use case is always executed as part of the base use case (unconditional). «extend» denotes optional behaviour — the extending use case adds functionality only when specified conditions are met (conditional). Both promote reuse, but their semantics differ.",
          hint: "Think mandatory vs. optional.",
        },
        {
          id: "q12",
          front:
            "In an «extend» relationship, which direction is the arrow drawn, and where are the conditions defined?",
          back: "The arrow is drawn from the extending use case to the base use case. The conditions under which the extension occurs are defined and captured in the base use case, not the extending one.",
        },
      ],
    },
    {
      name: "Session 2: Documenting Use Cases",
      cards: [
        {
          id: "q13",
          front:
            "List the sections of a structured use case description.",
          back: "1. Use Case Name (verb–noun phrase)\n2. ID (e.g. UC-001)\n3. Importance Level (high/medium/low)\n4. Stakeholders & Interests\n5. Primary Actor\n6. Description\n7. Trigger\n8. Conditions\n9. Relationships\n10. Flow of Events\n11. Sub-Flows\n12. Alternative/Exceptional Events",
        },
        {
          id: "q14",
          front:
            "What are the two types of trigger in a use case, and give an example of each?",
          back: "External trigger — originates from an actor outside the system (e.g. a customer placing an order). Temporal trigger — generated by the system itself based on a schedule (e.g. a timer that initiates data backup at midnight every day).",
        },
        {
          id: "q15",
          front:
            "What is the purpose of the conditions section in a use case description?",
          back: "It specifies the business rules that control the use case's behaviour — the constraints under which certain actions are performed or transitions occur. For example: 'when payment is received AND goods are delivered, close the order.' These translate directly into conditional statements and validation rules in code.",
        },
        {
          id: "q16",
          front:
            "What is a sub-flow in a use case description, and why is it useful?",
          back: "A sub-flow is a common constituent behaviour that appears in more than one use case. For example, 'validate payment details' might appear in both 'Make Order' and 'Process Refund'. Sub-flows reduce duplication and improve consistency across use case descriptions.",
        },
        {
          id: "q17",
          front:
            "What are alternative/exceptional events in a use case description?",
          back: "They are potential events not initially anticipated by users but specified by systems analysts — including error conditions, boundary cases, and recovery procedures. For example, an auto-backup mechanism activated upon power failure. Documenting these ensures robust systems that handle failure gracefully.",
        },
        {
          id: "q18",
          front:
            "Why is the flow of events section considered the most important part of a use case description?",
          back: "It describes the dynamic behaviour exhibited during use case execution as a step-by-step account of activities. It is the primary input for activity diagramming in Step 2 of the UML methodology, making it the bridge between requirements capture and detailed process design.",
        },
      ],
    },
    {
      name: "Session 3: Guidance for Use Case Modelling",
      cards: [
        {
          id: "q19",
          front:
            "What four key elements must be extracted from a functional requirements document before diagramming?",
          back: "1. The scope of the intended system (purpose and goal)\n2. The primary actors (internal and external) and their initiated use cases\n3. The behaviours of each use case\n4. The business rules that control those behaviours",
        },
        {
          id: "q20",
          front:
            "What is noun–verb analysis, and how does it support use case identification?",
          back: "It is a technique where the analyst reads the problem description identifying nouns (which suggest actors and entities), verbs (which suggest use cases and actions), and conditional statements (which suggest business rules). It is a well-established method in object-oriented analysis for systematically discovering use case diagram elements.",
        },
        {
          id: "q21",
          front:
            "State the three core principles of use case diagramming.",
          back: "1. No duplicated use cases — each function appears exactly once in the model\n2. Appropriate relationships — use association, generalisation, «include», and «extend» correctly\n3. Completeness — every use case has at least one actor, and every actor has at least one use case",
        },
        {
          id: "q22",
          front:
            "What is component-based use case design, and why is it beneficial?",
          back: "It means building a use case model incrementally — one actor or actor group at a time — then integrating all components into a single coherent diagram. Each component is designed and validated independently, which reduces errors, facilitates stakeholder review, and ensures all actors and use cases are accounted for.",
        },
        {
          id: "q23",
          front:
            "How does generalisation apply to payment processing in a use case model?",
          back: "Instead of separate unrelated use cases per payment method, a general 'Pay' use case is created and specialised into 'Pay by Credit Card', 'Pay by Debit Card', 'Pay by PayPal', etc. This reduces duplication, clarifies relationships, and embodies the open–closed principle: the model is open for extension (new methods) but closed for modification (base use case unchanged).",
        },
        {
          id: "q24",
          front:
            "Describe the three phases of the use case modelling process.",
          back: "1. Problem analysis — examine the problem description, domain knowledge, and stakeholder input\n2. Design reasoning — make deliberate, justifiable decisions about model structure, relationships, and decomposition\n3. Validation — review the model against original requirements, checking for completeness and correct relationship use. The process is iterative.",
        },
      ],
    },
  ],
};

export default lecture2;
