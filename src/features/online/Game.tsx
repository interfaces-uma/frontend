import Board from "@/components/Board";
import { useGameState } from "@/context/game/GameContext";
import Chat from "@/features/chat/components/Chat";
import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import { useOnlineManager } from "./hooks/useOnlineManager";
import { useNavigate } from "react-router";
import { useState } from "react";
import Popup from "@/components/Popup";

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

      <div className="flex mt-2 gap-2 mb-2">
        <div className="w-full max-w-[60%] min-w-[650px]">
          <Board
            board={cards}
            role={state.user.role || "spectator"}
            handleCardClick={manager.revealCard}
          />
        </div>

        <div className="right-0 absolute w-[25%]">
          <Chat />
        </div>
      </div>

      <Button onClick={() => {}}>LISTO</Button>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="¿Seguro que quieres salir de la sala?"
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
