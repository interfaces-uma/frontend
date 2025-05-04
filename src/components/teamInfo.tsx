import { useGameState } from "@/context/game/GameContext";
import type { TeamColor, User } from "@/types";

export default function TeamInfo({ team }: { team: TeamColor }) {
  const { state } = useGameState();

  const cardsReamining = state.cards.filter(
    (card) => card.color === team && !card.isFlipped,
  ).length;

  let leader: User | null = null;
  let agents: User[] = [];

  if (team !== null) {
    leader = state.teams[team].leader;
    agents = state.teams[team].agents;
  }
  return (
    <div
      className={
        team === "red"
          ? "bg-fondoRojo text-white text-center rounded-br-2xl px-10 flex items-center justify-center"
          : "bg-[#0D7E94] text-white text-center rounded-bl-2xl px-10 flex items-center justify-center"
      }
    >
      <div className="text-4xl font-bold">{cardsReamining} </div>
    </div>
  );
}
