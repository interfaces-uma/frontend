import Board from "@/components/Board";
import Button from "@/components/Button";
import ClueList from "@/components/ClueList";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import Popup from "@/components/Popup";
import { useGameState } from "@/context/game/GameContext";
import Chat from "@/features/chat/components/Chat";
import type { Clue } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useOnlineManager } from "./hooks/useOnlineManager";
import GameStatus from "@/components/GameStatus";

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

  return (
    <div className="bg-fondo w-full h-full">
      <div className="flex bg-cartas p-2">
        <div className="mr-auto">
          <Button onClick={handleBackClick} circular inversed>
            <BackIcon fill="currentColor" className="cartas" />
          </Button>
        </div>

        <div className="ml-auto">
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

      <div className="w-[50%]">
        <GameStatus />
      </div>

      <div className="flex mt-2 gap-2 mb-2">
        <div className="w-full max-w-[60%] min-w-[650px]">
          <Board
            board={cards}
            handleCardClick={
              state.user.role === "leader"
                ? manager.selectCard
                : manager.revealCard
            }
          />
        </div>

        <div className="right-0 absolute w-[25%]">
          <Chat />
        </div>
      </div>

      <Button onClick={() => {}}>LISTO</Button>

      {state.user.role === "leader" && (
        <div>
          <input
            value={clueInput}
            placeholder="Introduzca una pista"
            onChange={(e) => setClueInput(e.target.value)}
            className="p-2 bg-cartas"
          />
          <Button onClick={handleCreateClue}>Prueba sendClue</Button>
        </div>
      )}

      <ClueList />

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
