import type { Choice } from "../types/game";

interface ChoiceButtonProps {
  choice: Choice;
  selected: boolean;
  disabled: boolean;
  onSelect: (choice: Choice) => void;
}

export default function ChoiceButton({ choice, selected, disabled, onSelect }: ChoiceButtonProps) {
  return (
    <button
      type="button"
      className={`choice-button${selected ? " is-selected" : ""}`}
      onClick={() => onSelect(choice)}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="choice-id" aria-hidden="true">{choice.id}</span>
      <span className="choice-text">{choice.text}</span>
      <span className="choice-arrow" aria-hidden="true">→</span>
    </button>
  );
}
