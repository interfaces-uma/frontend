import Board from "@/components/Board";
import { useGameState } from "@/context/game/GameContext";
import Chat from "@/features/chat/components/Chat";
import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import { useOnlineManager } from "./hooks/useOnlineManager";
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
    <div className="h-screen w-screen grid grid-cols-[1fr_3fr_1fr] grid-rows-[1fr_1fr] gap-2 p-4 bg-fondo">
      <div className="col-span-3 flex justify-between items-center">
        <section
          id="botonSalir"
          className="absolute top-2 left-2 xl:top-7 xl:left-7 z-10"
        >
          <Button onClick={() => {}} circular>
            <BackIcon fill="fondo" />
          </Button>
        </section>

        <section className="absolute top-2 right-2 xl:top-7 xl:right-7 z-10">
          <Button onClick={() => {}} circular>
            <SettingsIcon
              fill="currentColor"
              className="cartas"
              width={20}
              height={20}
            />
          </Button>
        </section>
      </div>

      <div className="bg-red-500 rounded-xl text-white p-4 ">Panel Rojo</div>

      <div className="flex items-center justify-center w-full h-full row-span-2">
        <div className="w-full max-w-[1000px] min-w-[650px]">
          <Board
            board={cards}
            role={state.user.role || "spectator"}
            handleCardClick={manager.revealCard}
          />
        </div>
      </div>

      <div className="bg-blue-500 rounded-xl text-white p-4">Panel Azul</div>
      <div className="col-start-3">
        <Chat />
      </div>
    </div>
  );
}
