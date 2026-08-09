import { describe, expect, it } from "vitest";
import { getDiagnosis } from "./diagnosis";

describe("getDiagnosis", () => {
  it.each([
    [{ moral: 75, understanding: 75 }, "master"],
    [{ moral: 75, understanding: 74 }, "pure"],
    [{ moral: 74, understanding: 75 }, "savvy"],
    [{ moral: 74, understanding: 74 }, "independent"],
  ] as const)("75点境界で正しいタイプを返す", (scores, expected) => {
    expect(getDiagnosis(scores, "Aさん").id).toBe(expected);
  });

  it("診断コメントに人物名を含める", () => {
    expect(getDiagnosis({ moral: 100, understanding: 100 }, "Bさん").comment).toContain("Bさん");
  });
});
