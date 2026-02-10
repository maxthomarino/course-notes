# Lecture Notes Generation Prompt

> Copy this prompt, fill in the `{{placeholders}}`, and pass it to the agent alongside the relevant `.pptx` file.

---

## Prompt

You are a university lecture-notes author. Given the PowerPoint file `{{PPTX_FILENAME}}`, produce a Python script called `{{SCRIPT_FILENAME}}` that generates a professionally formatted `.docx` file of thorough, high-quality lecture notes.

---

### 1. Input & Output

| Item | Value |
|---|---|
| Source slides | `{{PPTX_FILENAME}}` (in the project root) |
| Output `.docx` | `{{DOCX_FILENAME}}` (in the project root) |
| Script file | `{{SCRIPT_FILENAME}}` (new, in the project root) |

---

### 2. Reference Implementation

Use `generate_lecture_notes.py` in the project root as the **exact** reference for style and architecture. Clone every helper function **verbatim**:

- Colour constants (`NAVY`, `MED_NAVY`, `BLUE`, `DARK_GREY`, `GREY`, `WHITE`, hex constants).
- `set_cell_shading()`, `make_style()`, `setup_styles()`.
- `add_page_number()`, `setup_headers_footers()` — change the header text to `"{{HEADER_TEXT}}"`.
- `add_concept_box()`, `add_formatted_table()`, `add_bullets()`, `add_body()`, `add_page_break()`.
- `build_cover()`, `build_toc()` — adapt titles (see below).

Do **not** invent new formatting utilities or deviate from the reference style.

---

### 3. Cover Page

```
Line 1 (28 pt, NAVY, bold, centred):   "{{COURSE_CODE}} {{COURSE_TITLE}}"
Line 2 (16 pt, MED_NAVY, centred):     "{{LECTURE_TITLE}}"
Line 3 (14 pt, GREY, italic, centred): "Lecture Notes"
Decorative line (BLUE):                 "━" × 40
```

---

### 4. Content Requirements

Read **every slide** in `{{PPTX_FILENAME}}`. Organise the notes into logical **sessions** (one `build_sessionN()` function each). Use the following rules:

#### 4.1 Session Structure

- Each session starts on a new page with a **Heading 1** (`"Session N: <Title>"`).
- Within a session use **Heading 2** for major sections (`"N.M <Title>"`) and **Heading 3** for subsections (`"N.M.K <Title>"`).
- Every session must contain **substantive prose** — never just bullet points. Aim for 1.5–3.5 pages per session depending on topic density.

#### 4.2 Writing Style

| Attribute | Requirement |
|---|---|
| Register | Academic British English (favour "behaviour", "organisation", "modelling", etc.) |
| Tone | Authoritative yet accessible; suitable for undergraduate students |
| Depth | Go **beyond** the slide text — explain *why*, give context, use analogies, connect concepts to prior sessions |
| Paragraph length | 3–6 sentences; avoid single-sentence paragraphs |
| Jargon | Define technical terms on first use |

#### 4.3 Pedagogical Elements

Use these elements throughout. They must use the exact helper functions from the reference script:

| Element | When to Use | Helper |
|---|---|---|
| **Key Concept box** | After introducing a core definition or principle (aim for 1–3 per session) | `add_concept_box(doc, title, text)` |
| **Formatted table** | For comparisons, taxonomies, feature lists (aim for 1+ per session where appropriate) | `add_formatted_table(doc, headers, rows)` |
| **Bullet list** | For enumerations, step-by-step procedures, lists of 3+ items | `add_bullets(doc, items)` |
| **Body paragraph** | Default prose container | `add_body(doc, text)` |

#### 4.4 Content Depth Guidelines

For each slide or group of slides:

1. **State** the concept clearly.
2. **Explain** the concept in detail — assume the student has only the notes, not the slides.
3. **Contextualise** — why does this matter? How does it relate to adjacent topics?
4. **Illustrate** — use an example, analogy, or comparison where appropriate.
5. **Summarise** into a Key Concept box if the concept is fundamental.

---

### 5. References Section

End with a `build_references()` function that adds a "References and Further Reading" page. Include:

{{REFERENCES}}

Format each as a bullet in 10 pt Calibri using the reference style from the reference script.

---

### 6. Script Structure

```python
"""
Generate {{COURSE_CODE}} Lecture Notes: {{LECTURE_TITLE}}
Produces a professionally formatted .docx file using python-docx.
"""

# Imports (identical to reference)
# Colour constants (identical to reference)
# OUTPUT_PATH = ...

# ── Helper functions (clone from reference) ──
# set_cell_shading, make_style, setup_styles,
# add_page_number, setup_headers_footers,
# add_concept_box, add_formatted_table, add_bullets, add_body, add_page_break

# ── Document construction ──
# build_cover(doc)   — adapted cover
# build_toc(doc)     — identical to reference
# build_session1(doc) ... build_sessionN(doc) — one per logical session
# build_references(doc) — adapted references

# ── Main ──
def main():
    doc = Document()
    # A4 page setup (21 × 29.7 cm, 2.54 cm margins)
    setup_styles(doc)
    setup_headers_footers(doc)
    build_cover(doc)
    build_toc(doc)
    # build_session1(doc) ... build_sessionN(doc)
    build_references(doc)
    doc.save(OUTPUT_PATH)

if __name__ == "__main__":
    main()
```

---

### 7. Quality Checklist

Before finishing, verify the script satisfies **all** of the following:

- [ ] Every slide's content is covered — nothing is silently dropped.
- [ ] Each session has at least one Key Concept box.
- [ ] Tables are used for any comparison or taxonomy with 3+ items.
- [ ] Prose goes meaningfully beyond the slide bullet points.
- [ ] All text uses academic British English spelling.
- [ ] The script runs with `python {{SCRIPT_FILENAME}}` and produces a valid `.docx`.
- [ ] The `.docx` is saved to the project root with the filename `{{DOCX_FILENAME}}`.
- [ ] No external dependencies beyond `python-docx` (which is already installed).

---

### 8. Execution

After creating the script, **run it** and confirm:
1. The `.docx` file is produced without errors.
2. Report the file size.

---

## Placeholder Reference

| Placeholder | Description | Example |
|---|---|---|
| `{{PPTX_FILENAME}}` | Input PowerPoint file | `Week 01_CS2ON.pptx` |
| `{{SCRIPT_FILENAME}}` | Python script to create | `generate_cs2on_lecture_notes.py` |
| `{{DOCX_FILENAME}}` | Output Word document | `CS2ON_Lecture_Notes_Introduction_to_Operating_Systems.docx` |
| `{{COURSE_CODE}}` | Short course code | `CS2ON` |
| `{{COURSE_TITLE}}` | Full course name | `Operating Systems and Computer Networking` |
| `{{LECTURE_TITLE}}` | Title for this lecture | `Introduction to Operating Systems and System Calls` |
| `{{HEADER_TEXT}}` | Running header on each page | `CS2ON Operating Systems and Computer Networking` |
| `{{REFERENCES}}` | Bulleted list of references | See section 5 |
