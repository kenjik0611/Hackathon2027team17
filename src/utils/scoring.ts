import type { Choice, GameScores } from "../types/game";

export const MAX_POINTS_PER_QUESTION = 3;

export function toPercentage(rawScore: number, questionCount: number): number {
  const maxScore = questionCount * MAX_POINTS_PER_QUESTION;

  if (maxScore <= 0) {
    return 0;
  }

  const normalized = Math.round((rawScore / maxScore) * 100);
  return Math.min(100, Math.max(0, normalized));
}

export function calculateScores(answers: Choice[], questionCount: number): GameScores {
  const totals = answers.reduce(
    (sum, choice) => ({
      moral: sum.moral + choice.moral,
      understanding: sum.understanding + choice.understanding,
    }),
    { moral: 0, understanding: 0 },
  );

  return {
    moral: toPercentage(totals.moral, questionCount),
    understanding: toPercentage(totals.understanding, questionCount),
  };
}
