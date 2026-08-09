import type { CSSProperties } from "react";
import ScoreMeter from "../components/ScoreMeter";
import type { GameScores, PersonData } from "../types/game";
import { getDiagnosis } from "../utils/diagnosis";

interface ResultScreenProps {
  person: PersonData;
  scores: GameScores;
  onRetry: () => void;
  onSelectAnother: () => void;
}

export default function ResultScreen({ person, scores, onRetry, onSelectAnother }: ResultScreenProps) {
  const diagnosis = getDiagnosis(scores, person.name);
  const theme = {
    "--person-accent": person.theme.accent,
    "--person-soft": person.theme.soft,
    "--person-deep": person.theme.deep,
  } as CSSProperties;

  return (
    <section className="result-screen content-width screen-enter" style={theme}>
      <div className="result-panel">
        <div className="result-heading">
          <div>
            <p className="eyebrow">DIAGNOSIS RESULT</p>
            <p className="result-label">診断結果</p>
          </div>
          <div className="result-person">
            <img src={person.portrait} alt="" />
            <span>{person.label}</span>
          </div>
        </div>

        <div className="result-title-wrap">
          <p>あなたのタイプは</p>
          <h1>{diagnosis.title}</h1>
          <span className={`type-code type-${diagnosis.id}`}>TYPE · {diagnosis.id.toUpperCase()}</span>
        </div>

        <div className="score-grid">
          <ScoreMeter label="モラル度" score={scores.moral} accent="#17a67a" />
          <ScoreMeter label={`${person.name}理解度`} score={scores.understanding} accent={person.theme.accent} />
        </div>

        <p className="result-comment">{diagnosis.comment}</p>
        <p className="result-footnote">この結果はゲーム内の人物設定に基づくエンタメ診断です。</p>
      </div>

      <div className="result-actions">
        <button className="primary-button themed-button" type="button" onClick={onRetry}>
          もう一度挑戦
          <span aria-hidden="true">↻</span>
        </button>
        <button className="secondary-button" type="button" onClick={onSelectAnother}>
          別の人に挑戦
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
