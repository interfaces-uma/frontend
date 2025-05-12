import { useGameState } from "@/context/game/GameContext";
import Settings from "@/features/settings/components/Settings";
import Button from "@/features/shared/components/Button";
import { useState } from "react";
import { socket } from "@/features/online/service/socket";
import { useNavigate } from "react-router";
import { useLobbyManager } from "@/features/lobby/hooks/useLobbyManager";
import Popup from "./Popup";

function Menu({ onClose, isGame }: { onClose: () => void; isGame: boolean }) {
  const [showSettings, setShowSettings] = useState(false);
  const { state } = useGameState();
  const manager = useLobbyManager();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isToLobby, setIsToLobby] = useState(false);

  const openSettings = () => {
    setShowSettings(!showSettings);
  };
  const openReglas = () => {
    console.log("Abrir reglas");
  };
  const handleGoOut = ({ aLobby }: { aLobby: boolean }) => {
    setIsToLobby(aLobby);
    setIsPopupOpen(true);
  };
  const salirDelLobby = () => {
    manager.leaveGame();
    navigate("/");
  };
  const salirDeLaPartida = () => {
    manager.leaveGame();
    navigate("/lobby");
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
        <h1 className="text-center text-4xl font-bold text-fondo">Menú</h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button onClick={openSettings} inversed style="w-full">
            Ajustes ⚙️
          </Button>
          <Button onClick={openReglas} inversed style="w-full">
            Reglas 📜
          </Button>
          <Button
            onClick={() => {
              handleGoOut({ aLobby: true });
            }}
            inversed
            style="w-full"
          >
            Salir al inicio 🏠
          </Button>
          {isGame && (
            <>
              <Button
                onClick={() => {
                  handleGoOut({ aLobby: false });
                }}
                inversed
                style="w-full"
              >
                Salir de la partida ❌
              </Button>
              <Button
                onClick={() => {
                  if (state.user.role === "leader") {
                    socket.emit("resetGame", state.code, state.user);
                  } else {
                    alert("Solo los capitanes pueden reiniciar la partida.");
                  }
                }}
                inversed
                disabled={state.user.role !== "leader"}
                style="w-full"
              >
                Reiniciar Partida 🔄
              </Button>
            </>
          )}
        </div>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          message={
            isToLobby
              ? "¿Seguro que quieres salir al inicio?"
              : "¿Seguro que quieres salir de la partida?"
          }
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={isToLobby ? salirDelLobby : salirDeLaPartida}>
              Sí
            </Button>
            <Button onClick={() => setIsPopupOpen(false)} inversed>
              No
            </Button>
          </div>
        </Popup>

        {/* Ajustes */}
        {showSettings && (
          <Settings onClose={openSettings} roomCode={state.code} />
        )}
      </div>
    </div>
  );
}

export default Menu;
