import type { ChoiceId, PersonData } from "../types/game";

const CHOICE_IDS: ChoiceId[] = ["A", "B", "C", "D"];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validatePersonData(value: unknown): asserts value is PersonData {
  if (!value || typeof value !== "object") {
    throw new Error("人物データがオブジェクトではありません。");
  }

  const person = value as Partial<PersonData>;
  const requiredStrings = [
    person.id,
    person.name,
    person.label,
    person.tagline,
    person.description,
    person.portrait,
  ];

  if (!requiredStrings.every(isNonEmptyString)) {
    throw new Error("人物データの必須文字列が不足しています。");
  }

  if (!person.theme || ![person.theme.accent, person.theme.soft, person.theme.deep].every(isNonEmptyString)) {
    throw new Error(`${person.name}のテーマ色が不正です。`);
  }

  if (!Array.isArray(person.questions) || person.questions.length !== 10) {
    throw new Error(`${person.name}の問題数は10問にしてください。`);
  }

  const questionIds = new Set<number>();
  person.questions.forEach((question) => {
    if (questionIds.has(question.id)) {
      throw new Error(`${person.name}の問題ID ${question.id} が重複しています。`);
    }
    questionIds.add(question.id);

    if (![question.category, question.question, question.note].every(isNonEmptyString)) {
      throw new Error(`${person.name}の問題ID ${question.id} に空の文字列があります。`);
    }

    if (!Array.isArray(question.choices) || question.choices.length !== 4) {
      throw new Error(`${person.name}の問題ID ${question.id} は4択にしてください。`);
    }

    const ids = question.choices.map((choice) => choice.id);
    if (!CHOICE_IDS.every((id) => ids.includes(id)) || new Set(ids).size !== 4) {
      throw new Error(`${person.name}の問題ID ${question.id} の選択肢IDが不正です。`);
    }

    question.choices.forEach((choice) => {
      if (!isNonEmptyString(choice.text)) {
        throw new Error(`${person.name}の問題ID ${question.id} に空の選択肢があります。`);
      }
      for (const score of [choice.moral, choice.understanding]) {
        if (!Number.isInteger(score) || score < 0 || score > 3) {
          throw new Error(`${person.name}の問題ID ${question.id} の点数は0〜3の整数にしてください。`);
        }
      }
    });
  });
}
