import type { CSSProperties } from "react";
import type { PersonData } from "../types/game";

interface IntroScreenProps {
  person: PersonData;
  onStart: () => void;
  onBack: () => void;
}

export default function IntroScreen({ person, onStart, onBack }: IntroScreenProps) {
  const theme = {
    "--person-accent": person.theme.accent,
    "--person-soft": person.theme.soft,
    "--person-deep": person.theme.deep,
  } as CSSProperties;

  return (
    <section className="intro-screen quiz-width screen-enter" style={theme}>
      <button className="text-button back-button" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> 人物選択へ
      </button>
      <div className="intro-layout">
        <div className="intro-portrait">
          <img src={person.portrait} alt={`${person.name}のイラスト`} />
          <span>{person.label}</span>
        </div>
        <div className="intro-copy">
          <p className="eyebrow">READY?</p>
          <h1>{person.name}のこと、<br />どれくらい分かる？</h1>
          <p className="intro-tagline">{person.tagline}</p>
          <p>{person.description}</p>
        </div>
      </div>
      <div className="rule-band">
        <div><strong>10問</strong><span>問題数</span></div>
        <div><strong>4択</strong><span>回答方式</span></div>
        <div><strong>2軸</strong><span>診断スコア</span></div>
      </div>
      <div className="intro-actions">
        <p>考えすぎず、いちばん近いものを選んでください。</p>
        <button className="primary-button themed-button" type="button" onClick={onStart}>
          ゲームスタート
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
