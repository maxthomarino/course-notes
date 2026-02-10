import {
  sm2,
  Rating,
  defaultCardState,
  isDue,
  intervalLabel,
  type CardState,
} from "@/lib/srs";

describe("SM-2 algorithm", () => {
  it("initialises with default state", () => {
    const state = defaultCardState();
    expect(state.easeFactor).toBe(2.5);
    expect(state.interval).toBe(0);
    expect(state.repetitions).toBe(0);
  });

  it("Again resets repetitions and sets interval to 0", () => {
    const state: CardState = {
      ...defaultCardState(),
      repetitions: 3,
      interval: 15,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      lastReview: new Date().toISOString(),
    };
    const next = sm2(state, Rating.Again);
    expect(next.repetitions).toBe(0);
    expect(next.interval).toBe(0);
  });

  it("Hard resets repetitions and sets interval to 1", () => {
    const state: CardState = {
      ...defaultCardState(),
      repetitions: 3,
      interval: 15,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      lastReview: new Date().toISOString(),
    };
    const next = sm2(state, Rating.Hard);
    expect(next.repetitions).toBe(0);
    expect(next.interval).toBe(1);
  });

  it("Good on first review sets interval to 1 day", () => {
    const state = defaultCardState();
    const next = sm2(state, Rating.Good);
    expect(next.repetitions).toBe(1);
    expect(next.interval).toBe(1);
  });

  it("Good on second review sets interval to 6 days", () => {
    const state: CardState = {
      ...defaultCardState(),
      repetitions: 1,
      interval: 1,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      lastReview: new Date().toISOString(),
    };
    const next = sm2(state, Rating.Good);
    expect(next.repetitions).toBe(2);
    expect(next.interval).toBe(6);
  });

  it("Good on third review multiplies interval by ease factor", () => {
    const state: CardState = {
      ...defaultCardState(),
      repetitions: 2,
      interval: 6,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      lastReview: new Date().toISOString(),
    };
    const next = sm2(state, Rating.Good);
    expect(next.repetitions).toBe(3);
    expect(next.interval).toBe(15); // round(6 * 2.5) = 15
  });

  it("Easy increases ease factor", () => {
    const state = defaultCardState();
    const next = sm2(state, Rating.Easy);
    expect(next.easeFactor).toBeGreaterThan(2.5);
  });

  it("ease factor never goes below 1.3", () => {
    let state = defaultCardState();
    for (let i = 0; i < 20; i++) {
      state = sm2(state, Rating.Again);
    }
    expect(state.easeFactor).toBe(1.3);
  });

  it("sets dueDate in the future for successful reviews", () => {
    const state = defaultCardState();
    const next = sm2(state, Rating.Good);
    expect(new Date(next.dueDate).getTime()).toBeGreaterThan(Date.now() - 1000);
  });

  it("sets dueDate to approximately now for Again rating", () => {
    const state = defaultCardState();
    const next = sm2(state, Rating.Again);
    const diff = Math.abs(new Date(next.dueDate).getTime() - Date.now());
    expect(diff).toBeLessThan(2000);
  });
});

describe("isDue", () => {
  it("returns true for default (never-reviewed) cards", () => {
    expect(isDue(defaultCardState())).toBe(true);
  });

  it("returns false for cards due in the future", () => {
    const future = new Date();
    future.setDate(future.getDate() + 7);
    const state: CardState = {
      ...defaultCardState(),
      dueDate: future.toISOString(),
    };
    expect(isDue(state)).toBe(false);
  });

  it("returns true for cards due in the past", () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);
    const state: CardState = {
      ...defaultCardState(),
      dueDate: past.toISOString(),
    };
    expect(isDue(state)).toBe(true);
  });
});

describe("intervalLabel", () => {
  it("returns '< 1 min' for Again on a new card", () => {
    expect(intervalLabel(defaultCardState(), Rating.Again)).toBe("< 1 min");
  });

  it("returns '1 d' for Good on a new card", () => {
    expect(intervalLabel(defaultCardState(), Rating.Good)).toBe("1 d");
  });

  it("returns multi-day label for mature cards", () => {
    const state: CardState = {
      ...defaultCardState(),
      repetitions: 2,
      interval: 6,
      easeFactor: 2.5,
      dueDate: new Date().toISOString(),
      lastReview: new Date().toISOString(),
    };
    expect(intervalLabel(state, Rating.Good)).toBe("15 d");
  });
});
