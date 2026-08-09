export type ChoiceId = "A" | "B" | "C" | "D";

export interface Choice {
  id: ChoiceId;
  text: string;
  moral: number;
  understanding: number;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  note: string;
  choices: Choice[];
}

export interface PersonTheme {
  accent: string;
  soft: string;
  deep: string;
}

export interface PersonData {
  id: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  portrait: string;
  theme: PersonTheme;
  questions: Question[];
}

export interface GameScores {
  moral: number;
  understanding: number;
}

export type DiagnosisId = "master" | "pure" | "savvy" | "independent";

export interface Diagnosis {
  id: DiagnosisId;
  title: string;
  comment: string;
}
