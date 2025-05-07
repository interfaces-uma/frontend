import Board from "@/components/Board";
import Button from "@/components/Button";
import ClueList from "@/components/ClueList";
import GameStatus from "@/components/GameStatus";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import Popup from "@/components/Popup";
import TeamInfo from "@/components/TeamInfo";
import { useGameState } from "@/context/game/GameContext";
import Chat from "@/features/chat/components/Chat";
import { socket } from "@/features/online/service/socket";
import type { Clue } from "@/types";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";
import { useOnlineManager } from "./hooks/useOnlineManager";
import { o } from "node_modules/react-router/dist/development/fog-of-war-1hWhK5ey.d.mts";
import FullScreenIcon from "@/components/Icons/IconFullScreen";

export default function Game() {
  const { state } = useGameState();
  const manager = useOnlineManager();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBackClick = () => {
    setIsPopupOpen(true);
  };

  const handleConfirmExit = () => {
    manager.leaveGame();
    navigate("/");
  };

  const cards = { cards: state.cards };

  const [clueInput, setClueInput] = useState("");

  const handleCreateClue = () => {
    const selectedCards = state.cards.filter((card) => card.isSelected);
    if (selectedCards.length === 0 || clueInput === "") return;
    const clue: Clue = { word: clueInput, cards: selectedCards };
    manager.setClue(clue);
    setClueInput("");
  };

  useEffect(() => {
    socket.on("endGame", (state, winner) => {
      alert(`El equipo ${winner} ha ganado la partida`);
      navigate("/lobby");
    });

    return () => {
      socket.off("endGame");
    };
  }, []);

  const isActualLeaderTurn = (): boolean => {
    const currentColor = state.turn.team;
    return (
      state.user.role === "leader" &&
      state.user.color === currentColor &&
      state.user.role === state.turn.role
    );
  };

  return (
    <div className="bg-fondo w-full h-screen flex flex-col">
      <div
        className={
          state.user.color === "red"
            ? "flex bg-fondoRojo justify-center items-center h-[8%] px-2"
            : "flex bg-fondoAzul justify-center items-center h-[8%] px-2"
        }
      >
        <div className="mr-auto">
          <Button onClick={handleBackClick} circular inversed>
            <BackIcon fill="currentColor" className="cartas" />
          </Button>
        </div>

        <div className="flex h-full">
          <TeamInfo team="blue" />
          {isActualLeaderTurn() ? (
            <input
              className="bg-cartas text-center text-xl"
              value={clueInput}
              type="text"
              placeholder="Pista..."
              onChange={(e) => setClueInput(e.target.value)}
            />
          ) : (
            <ClueList />
          )}
          <TeamInfo team="red" />
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            onClick={() => {
              document.documentElement.requestFullscreen();
              console.log(screen.orientation.angle);
            }}
            circular
            inversed
          >
            <FullScreenIcon
              className="cartas"
              width={20}
              height={20}
              strokeWidth={3}
            />
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
      </div>

      <div className="mt-2 mb-2 flex justify-center">
        <GameStatus />
      </div>

      <div className="flex w-full flex-1 min-h-0">
        <div className="w-[70%] flex ml-4 mr-4 mb-4">
          <Board
            board={cards}
            handleCardClick={
              state.user.role === "leader"
                ? manager.selectCard
                : manager.revealCard
            }
          />
        </div>
        <div className="flex-1 flex flex-col min-h-0 mr-4">
          <Chat />
          <div className="mt-4 mb-4 h-[15%]">
            <Button
              onClick={
                state.user.role === "leader"
                  ? handleCreateClue
                  : () => {
                      manager.nextTurn();
                    }
              }
              style="w-full h-full text-[clamp(0.5rem,2vw,2rem)] font-bold"
            >
              {state.user.role === "leader" ? "ENVIAR PISTA" : "LISTO"}
            </Button>
          </div>
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="¿Seguro que quieres salir de la partida?"
      >
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={handleConfirmExit}>Sí</Button>
          <Button onClick={() => setIsPopupOpen(false)} inversed>
            No
          </Button>
        </div>
      </Popup>
    </div>
  );
}
