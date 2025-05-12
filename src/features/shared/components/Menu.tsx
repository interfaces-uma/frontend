import { useGameState } from "@/context/game/GameContext";
import Settings from "@/features/settings/components/Settings";
import Button from "@/features/shared/components/Button";
import { useState } from "react";

function Menu({ onClose }: { onClose: () => void }) {
  const [showSettings, setShowSettings] = useState(false);
  const { state } = useGameState();

  const openSettings = () => {
    setShowSettings(!showSettings);
  };
  const openReglas = () => {
    console.log("Abrir reglas");
  };
  const salirPartida = () => {
    console.log("Salir de la partida");
  };
  // Maneja el clic fuera del popup
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Agrega el evento de clic
    >
      <div className="bg-cartas w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-6 shadow-lg">
        <h1 className="text-center text-4xl font-bold text-fondo">Menú</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button onClick={openSettings} inversed style="w-full">
            Ajustes ⚙️
          </Button>
          <Button onClick={openReglas} inversed style="w-full">
            Reglas 📜
          </Button>
          {state.isGameStarted && (
            <Button onClick={salirPartida} inversed style="w-full">
              Salir de la partida ❌
            </Button>
          )}
        </div>
      </div>

      {/* Ajustes */}
      {showSettings && (
        <Settings onClose={openSettings} roomCode={state.code} />
      )}
    </div>
  );
}

export default Menu;
