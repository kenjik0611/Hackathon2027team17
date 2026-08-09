import { describe, expect, it } from "vitest";
import aData from "../data/people/a.json";
import bData from "../data/people/b.json";
import { validatePersonData } from "./validation";

describe("人物データ", () => {
  it.each([
    ["Aさん", aData],
    ["Bさん", bData],
  ])("%sが10問×4択かつ点数0〜3である", (_name, data) => {
    expect(() => validatePersonData(data)).not.toThrow();
    expect(data.questions).toHaveLength(10);
    data.questions.forEach((question) => {
      expect(question.choices).toHaveLength(4);
      question.choices.forEach((choice) => {
        expect(Number.isInteger(choice.moral)).toBe(true);
        expect(Number.isInteger(choice.understanding)).toBe(true);
        expect(choice.moral).toBeGreaterThanOrEqual(0);
        expect(choice.moral).toBeLessThanOrEqual(3);
        expect(choice.understanding).toBeGreaterThanOrEqual(0);
        expect(choice.understanding).toBeLessThanOrEqual(3);
      });
    });
  });

  it("問題数が不足したデータを拒否する", () => {
    const invalid = { ...aData, questions: aData.questions.slice(0, 9) };
    expect(() => validatePersonData(invalid)).toThrow("問題数は10問");
  });
});
