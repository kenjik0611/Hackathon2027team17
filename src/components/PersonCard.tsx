import type { CSSProperties } from "react";
import type { PersonData } from "../types/game";

interface PersonCardProps {
  person: PersonData;
  onSelect: (person: PersonData) => void;
}

export default function PersonCard({ person, onSelect }: PersonCardProps) {
  const theme = {
    "--person-accent": person.theme.accent,
    "--person-soft": person.theme.soft,
    "--person-deep": person.theme.deep,
  } as CSSProperties;

  return (
    <article className="person-card" style={theme}>
      <div className="person-portrait-wrap">
        <img className="person-portrait" src={person.portrait} alt={`${person.name}のイラスト`} />
        <span className="person-letter" aria-hidden="true">{person.id.toUpperCase()}</span>
      </div>
      <div className="person-card-content">
        <p className="person-edition">{person.label}</p>
        <h2>{person.name}</h2>
        <p className="person-tagline">{person.tagline}</p>
        <p className="person-description">{person.description}</p>
        <button className="person-button" type="button" onClick={() => onSelect(person)}>
          挑戦する
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
