import { useGameState } from "@/context/game/GameContext";
import type { TeamColor, User } from "@/types";

export default function teamInfo({ team }: { team: TeamColor }) {
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
  // lo de abajo es de un preset de un grid de internet a ver si puedo hacerlo con ese
  return (
    <div
      className={
        team === "red"
          ? "bg-fondoRojo rounded-xl text-white w-84 flex flex-col items-center justify-between space-y-4"
          : "bg-fondoAzul rounded-xl text-white w-84 flex flex-col items-center justify-between space-y-4"
      }
    >
      <div className="text-5xl font-bold">{cardsReamining} </div>
      <div className="w-full ml-4 ">
        <div className="text-sm mb-1 border-2 w-max px-2 py-1">Capitán </div>
        <div className="text-base">{leader ? leader.name : "---"}</div>
      </div>

      <div className="w-full ml-4">
        <div className="text-sm mb-1 border-2 w-max px-2 py-1">Agentes </div>
        <div className="text-base">{agents.map((agent) => agent.name)}</div>
      </div>

      <div className="grid grid-rows-3 grid-flow-col gap-4 px-4 py-4 leading-10">
        <div className="p-4 w-full bg-fuchsia-900 rounded-xl row-span-3">
          &nbsp;
        </div>
        <div className="p-4 w-full bg-fuchsia-800 rounded-xl col-span-2">
          &nbsp;
        </div>
        <div className="p-4 w-full bg-fuchsia-700 rounded-xl row-span-2 col-span-2">
          &nbsp;
        </div>
      </div>
    </div>
  );
}
