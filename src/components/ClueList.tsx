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
      {state.clue === null ? (
        <p>No hay pista aún.</p>
      ) : (
        <p>
          {state.clue.word} ---{"---"}
          {state.clue.cards.filter((c) => !c.isFlipped).length}
        </p>
      )}
    </div>
  );
}
