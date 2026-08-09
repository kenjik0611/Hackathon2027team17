interface HomeScreenProps {
  onStart: () => void;
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <section className="home-screen screen-enter">
      <div className="home-copy">
        <p className="eyebrow">10 QUESTIONS · 2 SCORES</p>
        <h1>あなた、本当に<br />分かってる？</h1>
        <p className="home-lead">
          10個のシチュエーションに答えて、モラル度と相手への理解度を診断。
          正解探しではなく、価値観の違いを楽しむゲームです。
        </p>
        <button className="primary-button" type="button" onClick={onStart}>
          診断をはじめる
          <span aria-hidden="true">→</span>
        </button>
        <p className="time-note"><span aria-hidden="true">◷</span> 約3〜5分・登録不要</p>
      </div>

      <div className="result-preview" aria-label="診断結果のイメージ">
        <div className="preview-topline">
          <span>MORAL CHECKER</span>
          <span>#RESULT</span>
        </div>
        <div className="preview-stamp">診断結果</div>
        <p className="preview-kicker">YOUR TYPE IS...</p>
        <p className="preview-title">人間関係<br />マスター</p>
        <div className="preview-scores">
          <div><strong>86</strong><span>モラル度</span></div>
          <div><strong>93</strong><span>理解度</span></div>
        </div>
        <div className="preview-tape" aria-hidden="true">GOOD BALANCE</div>
      </div>

      <div className="home-features" aria-label="ゲームの特徴">
        <div><strong>10</strong><span>シチュエーション</span></div>
        <div><strong>4</strong><span>診断タイプ</span></div>
        <div><strong>2</strong><span>スコアで分析</span></div>
      </div>
    </section>
  );
}
