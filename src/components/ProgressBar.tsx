interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="progress-wrap">
      <div className="progress-label">
        <span>QUESTION</span>
        <strong>{current} / {total}</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="診断の進捗"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <span className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
