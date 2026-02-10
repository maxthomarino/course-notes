# Flashcard Generation Prompt

Copy the block below and replace the placeholders before submitting.

---

```
You are a flashcard author for a university lecture-notes portal.

## Input

The attached PDF is a set of lecture notes for the module **{MODULE_CODE} {MODULE_NAME}**.
The lecture is: **{LECTURE_TITLE}** (lectureId: "{LECTURE_ID}", e.g. "lecture2").
The course slug is: **"{COURSE_SLUG}"** (e.g. "software-system-design").

## Task

Read the entire PDF. Produce a TypeScript flashcard data file that follows this exact structure:

```typescript
import type { LectureFlashcards } from "../types";

const {VARIABLE_NAME}: LectureFlashcards = {
  courseSlug: "{COURSE_SLUG}",
  lectureId: "{LECTURE_ID}",
  lectureTitle: "{LECTURE_TITLE}",
  topics: [
    {
      name: "Topic Name",
      cards: [
        {
          id: "q1",
          front: "Question text?",
          back: "Answer text.",
          hint: "Optional hint",  // omit if not needed
        },
      ],
    },
  ],
};

export default {VARIABLE_NAME};
```

## Flashcard Rules

### Coverage
- Create **3–6 cards per major section/session** in the PDF.
- Every key concept, definition, and important distinction must have at least one card.
- Aim for **15–30 cards total** depending on PDF length and density.

### Card Quality
- **Front (question):** Ask ONE clear, specific question. Avoid yes/no questions. Prefer "What…", "Name…", "Explain…", "Compare…", "List…" formats.
- **Back (answer):** Provide a concise but complete answer (1–3 sentences). Use `\n` for line breaks when listing items.
- **Hint (optional):** Only include when the question is likely to be confused with a similar concept. Keep under 10 words.
- **Avoid** cards that test trivial facts (page numbers, lecturer names, slide counts).
- **Prioritise** cards that test understanding over memorisation — "Why does X matter?" over "What slide is X on?".

### Card Types to Include
| Type | Example Front | When to Use |
|------|--------------|-------------|
| Definition | "What is encapsulation?" | Every key term on first appearance |
| Comparison | "What is the difference between «include» and «extend»?" | Any pair of concepts that students commonly confuse |
| Enumeration | "List the four pillars of OOP." | Any list of 3+ items that form a cohesive set |
| Application | "Given a system with multiple payment methods, which UML relationship would you use and why?" | Core design/modelling concepts |
| Explanation | "Why are use case diagrams the first step in the UML methodology?" | Fundamental principles and rationale |

### Grouping
- Group cards into `topics` that match the PDF's section headings or session titles.
- Use the PDF's heading structure as the `name` for each topic.

### IDs
- Use sequential IDs: `"q1"`, `"q2"`, … `"q30"` etc.
- IDs must be unique within the file.

## Output

Return ONLY the TypeScript file content — no explanation, no markdown fences around the outer file, no commentary. The file should be ready to save directly to:

  `src/content/flashcards/{COURSE_SLUG}/{LECTURE_ID}.ts`

Then I will register it in `src/content/flashcards/index.ts` myself.
```

---

## Example usage (filled in)

For the Use Case Diagrams lecture, you would submit:

```
You are a flashcard author for a university lecture-notes portal.

## Input

The attached PDF is a set of lecture notes for the module **CS2SD Software Systems Design**.
The lecture is: **Use Case Diagrams** (lectureId: "lecture2", e.g. "lecture2").
The course slug is: **"software-system-design"** (e.g. "software-system-design").

## Task
...
```

And attach the file `use_cases.docx` (or its PDF export).
