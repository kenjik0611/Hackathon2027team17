import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import aData from "./data/people/a.json";
import bData from "./data/people/b.json";
import HomeScreen from "./screens/HomeScreen";
import IntroScreen from "./screens/IntroScreen";
import PersonSelectScreen from "./screens/PersonSelectScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";
import type { Choice, PersonData } from "./types/game";
import { calculateScores } from "./utils/scoring";
import { validatePersonData } from "./utils/validation";

type Screen = "home" | "select" | "intro" | "quiz" | "result";

const STATUS_LABELS: Record<Screen, string> = {
  home: "トップ",
  select: "人物選択",
  intro: "ルール",
  quiz: "診断中",
  result: "結果",
};

function loadPeople(): { people: PersonData[]; error: string | null } {
  try {
    const candidates: unknown[] = [aData, bData];
    candidates.forEach(validatePersonData);
    return { people: candidates as PersonData[], error: null };
  } catch (error) {
    console.error("人物データの読み込みに失敗しました。", error);
    return {
      people: [],
      error: error instanceof Error ? error.message : "人物データを確認してください。",
    };
  }
}

export default function App() {
  const data = useMemo(loadPeople, []);
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen, questionIndex]);

  const resetGame = () => {
    setQuestionIndex(0);
    setAnswers([]);
  };

  const goHome = () => {
    resetGame();
    setSelectedPerson(null);
    setScreen("home");
  };

  const choosePerson = (person: PersonData) => {
    resetGame();
    setSelectedPerson(person);
    setScreen("intro");
  };

  const startQuiz = () => {
    if (!selectedPerson) {
      setScreen("select");
      return;
    }
    resetGame();
    setScreen("quiz");
  };

  const answerQuestion = (choice: Choice) => {
    if (!selectedPerson || answers.length !== questionIndex) {
      return;
    }

    const nextAnswers = [...answers, choice];
    setAnswers(nextAnswers);

    if (questionIndex >= selectedPerson.questions.length - 1) {
      setScreen("result");
      return;
    }

    setQuestionIndex((current) => current + 1);
  };

  const retry = () => {
    if (!selectedPerson) {
      setScreen("select");
      return;
    }
    resetGame();
    setScreen("quiz");
  };

  const selectAnotherPerson = () => {
    resetGame();
    setSelectedPerson(null);
    setScreen("select");
  };

  if (data.error) {
    return (
      <div className="app-shell">
        <Header status="エラー" onHome={goHome} />
        <main className="error-state">
          <p className="eyebrow">DATA ERROR</p>
          <h1>ゲームを読み込めませんでした</h1>
          <p>{data.error}</p>
          <p className="muted">開発者ツールのコンソールで原因を確認できます。</p>
        </main>
      </div>
    );
  }

  const scores = selectedPerson
    ? calculateScores(answers, selectedPerson.questions.length)
    : { moral: 0, understanding: 0 };

  return (
    <div className="app-shell">
      <Header status={STATUS_LABELS[screen]} onHome={goHome} />
      <main>
        {screen === "home" && <HomeScreen onStart={() => setScreen("select")} />}
        {screen === "select" && (
          <PersonSelectScreen people={data.people} onSelect={choosePerson} />
        )}
        {screen === "intro" && selectedPerson && (
          <IntroScreen person={selectedPerson} onStart={startQuiz} onBack={selectAnotherPerson} />
        )}
        {screen === "quiz" && selectedPerson && (
          <QuizScreen
            key={`${selectedPerson.id}-${questionIndex}`}
            person={selectedPerson}
            questionIndex={questionIndex}
            onAnswer={answerQuestion}
          />
        )}
        {screen === "result" && selectedPerson && answers.length === selectedPerson.questions.length && (
          <ResultScreen
            person={selectedPerson}
            scores={scores}
            onRetry={retry}
            onSelectAnother={selectAnotherPerson}
          />
        )}
      </main>
    </div>
  );
}
