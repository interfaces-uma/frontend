import Board from "@/components/Board";
import { useGameState } from "@/context/game/GameContext";
import Chat from "@/features/chat/components/Chat";
import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import { useOnlineManager } from "./hooks/useOnlineManager";
import { T } from "node_modules/react-router/dist/development/fog-of-war-1hWhK5ey.d.mts";
import TeamInfo from "@/components/teamInfo";
export default function Game() {
  const { state } = useGameState();
  const manager = useOnlineManager();

  // const pruebaBack = (cardWord: string) => {
  //   const card: Card = {
  //     word: cardWord,
  //     color: "red",
  //     isFlipped: false,
  //     isSelected: false,
  //   };
  //   console.log(cardWord);
  //   socket.emit("guessCard", card);
  // };

  const cards = { cards: state.cards };

  return (
    <div className="h-screen w-screen flex flex-col bg-fondo">
      <div className="flex justify-between h-[100px] px-4 bg-cartas">
        <Button onClick={() => {}} circular inversed>
          <BackIcon fill="currentColor" className="cartas" />
        </Button>

        <Button onClick={() => {}} circular inversed>
          <SettingsIcon
            fill="currentColor"
            className="cartas"
            width={20}
            height={20}
          />
        </Button>
      </div>

      <div className="col-span-3 px-4 grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_1fr] gap-2">
        <TeamInfo team="red" />

        <div className="flex  justify-center w-full h-full row-span-2">
          <div className="w-full max-w-[1000px] min-w-[650px]">
            <Board
              board={cards}
              role={state.user.role || "spectator"}
              handleCardClick={manager.revealCard}
            />
          </div>
        </div>

        <TeamInfo team="blue" />
        <div className="col-start-3">
          <Chat />
        </div>
      </div>
    </div>
  );
}
