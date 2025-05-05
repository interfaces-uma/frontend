import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import { useGameState } from "@/context/game/GameContext";
import { useState } from "react";
import Settings from "./Settings";

function Menu({ onClose }: { onClose: () => void }) {
  const [showSettings, setShowSettings] = useState(false);
  const { state } = useGameState();

  const openSettings = () => {
    setShowSettings(!showSettings);
  };
  // Maneja el clic fuera del popup
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Agrega el evento de clic
    >
      <div className="bg-cartas w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-6 shadow-lg">
        <Button onClick={openSettings} inversed>
          Ajustes
        </Button>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
      {/* Ajustes */}
      {showSettings && (
        <Settings onClose={openSettings} roomCode={state.code} />
      )}
    </div>
  );
}

export default Menu;
