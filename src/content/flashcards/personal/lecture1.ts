import type { LectureFlashcards } from "../types";

const lecture1: LectureFlashcards = {
  courseSlug: "personal",
  lectureId: "lecture1",
  lectureTitle: "Use Cases, Actors & Association",
  topics: [
    {
      name: "Use Cases",
      cards: [
        {
          id: "q1",
          front: "What is a Use Case?",
          back: "A Use Case is a specification of behaviour that captures the requirements of a system — in short, what the system is supposed to do.",
        },
        {
          id: "q2",
          front: "What is the 'subject' of a Use Case?",
          back: "The subject is the system under consideration. It is defined because the same Use Case may apply to many different systems.",
        },
        {
          id: "q3",
          front: "Why must a Use Case be defined under a subject?",
          back: "Because a Use Case may apply to many other systems. The subject disambiguates which system the behaviour belongs to.",
        },
      ],
    },
    {
      name: "Actors",
      cards: [
        {
          id: "q4",
          front: "What is a primary actor?",
          back: "A primary actor is an actor that triggers (initiates) a Use Case. For example, a Customer triggering Checkout, or a Seller triggering List Item for Sale.",
        },
        {
          id: "q5",
          front: "What is a secondary actor?",
          back: "A secondary actor is an actor that is used by the system during execution of a Use Case in order to complete it. For example, a payment gateway processing a refund, or an identity provider verifying an ID.",
        },
        {
          id: "q6",
          front: "What is the key difference between a primary actor and a secondary actor?",
          back: "A primary actor triggers the Use Case (initiates the interaction). A secondary actor is called upon by the system to help complete the Use Case (responds to the system).",
          hint: "Who starts the interaction?",
        },
        {
          id: "q7",
          front: "Are secondary actors typically human or machine?",
          back: "Secondary actors are very commonly machine actors — e.g. payment gateways, identity providers, external APIs.",
        },
        {
          id: "q8",
          front: "A staff member triggers Refund Purchase. The system then contacts a payment gateway. Which is the primary actor and which is the secondary actor?",
          back: "The staff member is the primary actor (they triggered the Use Case). The payment gateway is the secondary actor (the system uses it to complete the refund).",
        },
        {
          id: "q9",
          front: "Can a Use Case have associations with more than one actor?",
          back: "Yes. A Use Case can have many associations with different actors — for example, a primary actor who triggers it and one or more secondary actors the system calls upon.",
        },
      ],
    },
    {
      name: "Association",
      cards: [
        {
          id: "q10",
          front: "What is an association in a Use Case diagram?",
          back: "An association is a relationship between an actor and a Use Case. It means the actor participates in or communicates with the Use Case.",
        },
        {
          id: "q11",
          front: "How is an association depicted in a Use Case diagram?",
          back: "A solid line between the actor and the Use Case.",
        },
        {
          id: "q12",
          front: "What are the two things an association can mean?",
          back: "1. The actor participates in the behaviour described by the Use Case.\n2. The actor exchanges information with the system.",
        },
        {
          id: "q13",
          front: "Give four Use Cases a Customer (primary actor) might be associated with in an e-commerce system.",
          back: "1. Browse Products\n2. Add Items to Cart\n3. Checkout\n4. Pay",
        },
        {
          id: "q14",
          front: "Give four Use Cases a Seller (primary actor) might be associated with in an e-commerce system.",
          back: "1. List Item for Sale\n2. Edit Listing\n3. View Orders\n4. Respond to Buyer Message",
        },
        {
          id: "q15",
          front: "Give two examples of a secondary actor associated with a Use Case.",
          back: "1. A payment gateway (secondary actor) associated with Create Shipment or Refund Purchase.\n2. An identity provider (secondary actor) associated with ID Verification.",
        },
        {
          id: "q16",
          front: "Does a Use Case diagram show the flow or ordering of steps?",
          back: "No. A Use Case diagram shows only the system boundary, the Use Cases, the actors, and high-level relationships — not flow or ordering.",
        },
      ],
    },
  ],
};

export default lecture1;
