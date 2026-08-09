import type { CSSProperties } from "react";

interface ScoreMeterProps {
  label: string;
  score: number;
  accent: string;
}

export default function ScoreMeter({ label, score, accent }: ScoreMeterProps) {
  const style = {
    "--meter-score": `${score * 3.6}deg`,
    "--meter-accent": accent,
  } as CSSProperties;

  return (
    <div className="score-item">
      <div className="score-meter" style={style} role="img" aria-label={`${label} ${score}点`}>
        <div className="score-meter-inner">
          <strong>{score}</strong>
          <span>/ 100</span>
        </div>
      </div>
      <p>{label}</p>
    </div>
  );
}
