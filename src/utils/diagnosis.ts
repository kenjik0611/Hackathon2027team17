import type { Diagnosis, GameScores } from "../types/game";

const HIGH_SCORE = 75;

export function getDiagnosis(scores: GameScores, personName: string): Diagnosis {
  const moralIsHigh = scores.moral >= HIGH_SCORE;
  const understandingIsHigh = scores.understanding >= HIGH_SCORE;

  if (moralIsHigh && understandingIsHigh) {
    return {
      id: "master",
      title: "人間関係マスター",
      comment: `${personName}の気持ちをつかみながら、周りへの配慮もできるバランス派。信頼を育てる選択が自然にできています。`,
    };
  }

  if (moralIsHigh) {
    return {
      id: "pure",
      title: "ピュア優等生",
      comment: `まっすぐで誠実な判断が光るあなた。${personName}らしい考え方をもう少し知ると、さらに息の合う関係になれそうです。`,
    };
  }

  if (understandingIsHigh) {
    return {
      id: "savvy",
      title: "世渡り上手",
      comment: `${personName}の価値観をよく読めています。場面によっては、相手だけでなく周りへの気遣いも足すと一段上の選択に。`,
    };
  }

  return {
    id: "independent",
    title: "我が道タイプ",
    comment: `自分の感覚を大切にできるタイプ。${personName}との違いを面白がりながら、別の選択肢も試すと新しい発見がありそうです。`,
  };
}
