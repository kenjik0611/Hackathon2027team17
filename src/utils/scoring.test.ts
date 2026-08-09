import { describe, expect, it } from "vitest";
import type { Choice } from "../types/game";
import { calculateScores, toPercentage } from "./scoring";

describe("toPercentage", () => {
  it("満点を100点に換算する", () => {
    expect(toPercentage(30, 10)).toBe(100);
  });

  it("問題数0では0を返し、0除算しない", () => {
    expect(toPercentage(0, 0)).toBe(0);
  });

  it("換算結果を0〜100に収める", () => {
    expect(toPercentage(-3, 10)).toBe(0);
    expect(toPercentage(33, 10)).toBe(100);
  });
});

describe("calculateScores", () => {
  it("回答の2軸を問題数に応じて換算する", () => {
    const answers: Choice[] = [
      { id: "A", text: "回答1", moral: 3, understanding: 1 },
      { id: "B", text: "回答2", moral: 0, understanding: 2 },
    ];

    expect(calculateScores(answers, 2)).toEqual({ moral: 50, understanding: 50 });
  });
});
