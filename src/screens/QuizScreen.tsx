import { useEffect, useRef, useState, type CSSProperties } from "react";
import ChoiceButton from "../components/ChoiceButton";
import ProgressBar from "../components/ProgressBar";
import type { Choice, PersonData } from "../types/game";

interface QuizScreenProps {
  person: PersonData;
  questionIndex: number;
  onAnswer: (choice: Choice) => void;
}

export default function QuizScreen({ person, questionIndex, onAnswer }: QuizScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const question = person.questions[questionIndex];
  const theme = {
    "--person-accent": person.theme.accent,
    "--person-soft": person.theme.soft,
    "--person-deep": person.theme.deep,
  } as CSSProperties;

  useEffect(() => () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
  }, []);

  const selectChoice = (choice: Choice) => {
    if (lockRef.current) {
      return;
    }

    lockRef.current = true;
    setSelectedId(choice.id);
    timerRef.current = window.setTimeout(() => onAnswer(choice), 380);
  };

  return (
    <section className="quiz-screen quiz-width screen-enter" style={theme}>
      <div className="quiz-person">
        <img src={person.portrait} alt="" />
        <div><span>{person.label}</span><strong>{person.tagline}</strong></div>
      </div>
      <ProgressBar current={questionIndex + 1} total={person.questions.length} />
      <div className="question-block">
        <p className="category-label">{question.category}</p>
        <h1>{question.question}</h1>
        <p className="question-note">{question.note}</p>
      </div>
      <div className="choice-list" aria-label="選択肢">
        {question.choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            selected={selectedId === choice.id}
            disabled={selectedId !== null}
            onSelect={selectChoice}
          />
        ))}
      </div>
      <p className="quiz-hint">回答後は前の問題に戻れません</p>
    </section>
  );
}
