// ClueList.tsx
import { useGameState } from "@/context/game/GameContext";
import type { Clue } from "@/types";

export default function ClueList() {
  const { state } = useGameState();

  const teamColor = state.user.color;
  let clues: Clue[] = [];
  if (teamColor) clues = state.teams[teamColor].clueList;

  return (
    <div className="bg-cartas">
      <h2> CLUE LIST</h2>
      {clues.length === 0 ? (
        <p>No hay pistas aún.</p>
      ) : (
        <ul>
          {clues.map(
            (clue, index) =>
              clue && (
                <li key={index}>
                  <strong>{clue.word}</strong> — Numero de cartas por adivinar:{" "}
                  {clue.cards.filter((card) => !card.isFlipped).length}
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
}
