// ClueList.tsx
import { useGameState } from "@/context/game/GameContext";
import type { Clue } from "@/types";

export default function ClueList() {
  const { state } = useGameState();

  const teamColor = state.user.color;
  let clues: Clue[] = [];
  if (teamColor) clues = state.teams[teamColor].clueList;

  return (
    <div className="bg-cartas text-center text-2xl px-20">
      <p className="text-xl">PISTA</p>
      {state.clue === null ? (
        <p>No hay pista aún.</p>
      ) : (
        <p className="text-2xl font-bold">
          {state.clue.word.toUpperCase()}---{"---"}
          {state.clue.cards.filter((c) => !c.isFlipped).length}
        </p>
      )}
    </div>
  );
}
