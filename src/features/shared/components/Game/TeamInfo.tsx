import { useGameState } from "@/context/game/GameContext";
import type { TeamColor } from "@/types";

export default function TeamInfo({ team }: { team: TeamColor }) {
  const { state } = useGameState();

  const cardsReamining = state.cards.filter(
    (card) => card.color === team && !card.isFlipped,
  ).length;

  return (
    <div
      className={
        team === "red"
          ? "bg-[#7c0d0d] text-white text-center rounded-br-2xl px-10 flex items-center justify-center"
          : "bg-[#178095] text-white text-center rounded-bl-2xl px-10 flex items-center justify-center"
      }
    >
      <div className="text-4xl font-bold">{cardsReamining} </div>
    </div>
  );
}
