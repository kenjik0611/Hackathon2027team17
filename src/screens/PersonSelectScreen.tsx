import PersonCard from "../components/PersonCard";
import type { PersonData } from "../types/game";

interface PersonSelectScreenProps {
  people: PersonData[];
  onSelect: (person: PersonData) => void;
}

export default function PersonSelectScreen({ people, onSelect }: PersonSelectScreenProps) {
  return (
    <section className="select-screen content-width screen-enter">
      <div className="section-heading">
        <p className="eyebrow">CHOOSE A PERSON</p>
        <h1>誰について挑戦する？</h1>
        <p>気になる人物を選んで、その人らしい考え方を当ててみよう。</p>
      </div>
      <div className="person-grid">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
