import { parseLectureFilename } from "@/lib/filename-parser";

describe("parseLectureFilename", () => {
  it("extracts lecture number from Lec1 pattern", () => {
    const result = parseLectureFilename(
      "CS2SD_Lecture_Notes_Introduction_to_OO_Design_Lec1.pdf"
    );
    expect(result.label).toBe("Lecture 1");
    expect(result.sortKey).toBe(1);
    expect(result.title).toContain("Introduction to OO Design");
  });

  it("extracts lecture number from Lec_02 pattern", () => {
    const result = parseLectureFilename("CS101_Design_Patterns_Lec_02.pdf");
    expect(result.label).toBe("Lecture 2");
    expect(result.sortKey).toBe(2);
  });

  it("extracts week number from Week_01 pattern", () => {
    const result = parseLectureFilename("Week_01_Intro_To_Computing.pdf");
    expect(result.label).toBe("Week 1");
    expect(result.sortKey).toBe(1);
  });

  it("handles filenames with no number pattern", () => {
    const result = parseLectureFilename("Overview_of_Course.pdf");
    expect(result.label).toBeNull();
    expect(result.sortKey).toBe(Infinity);
    expect(result.title).toBe("Overview of Course");
  });

  it("strips course code prefix", () => {
    const result = parseLectureFilename("CS2SD_Lecture_Notes_Testing.pdf");
    expect(result.title).not.toContain("CS2SD");
  });

  it("converts underscores to spaces", () => {
    const result = parseLectureFilename("Some_Long_Title_Here.pdf");
    expect(result.title).toBe("Some Long Title Here");
  });

  it("preserves fileName", () => {
    const name = "CS2SD_Lecture_Notes_Introduction_to_OO_Design_Lec1.pdf";
    const result = parseLectureFilename(name);
    expect(result.fileName).toBe(name);
  });
});
