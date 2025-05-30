// ClueList.tsx
import { useGameState } from "@/context/game/GameContext";
import type { Clue } from "@/types";

export default function ClueList() {
  const { state } = useGameState();

  const teamColor = state.user.color;
  let clues: Clue[] = [];
  if (teamColor) clues = state.teams[teamColor].clueList;

  return (
    <div className="bg-cartas text-center px-20 flex items-center justify-center">
      {state.clue === null ? (
        <h2>-</h2>
      ) : (
        <p className="text-3xl font-bold">
          {state.clue.word.toUpperCase()}
          {"     "}
          {state.clue.cards.filter((c) => !c.isFlipped).length}
        </p>
      )}
    </div>
  );
}
