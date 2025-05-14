import { useGameState } from "@/context/game/GameContext";
import Settings from "@/features/settings/components/Settings";
import Button from "@/features/shared/components/Button";
import { useState } from "react";
import { socket } from "@/features/online/service/socket";
import { useNavigate } from "react-router";
import { useLobbyManager } from "@/features/lobby/hooks/useLobbyManager";
import Popup from "./Popup";
import { useTranslation } from "react-i18next";

function Menu({ onClose, isGame }: { onClose: () => void; isGame: boolean }) {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const { state } = useGameState();
  const manager = useLobbyManager();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReinicio, setIsReinicio] = useState(false);
  const [isToLobby, setIsToLobby] = useState(false);
  const [genericPopup, setGenericPopup] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });
  const response = isToLobby
    ? t("confirm_exit_to_home")
    : t("confirm_leave_game");

  const openSettings = () => {
    setShowSettings(!showSettings);
  };
  const openReglas = () => {
    console.log("Open Rules");
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
  const reiniciarPartida = () => {
    console.log(state.user.role);
    if (state.user.role === "leader") {
      socket.emit("resetGame", state.code, state.user);
    } else {
      showPopup(t("Only captains can restart the game"));
    }
  };
  const handleReinicio = () => {
    setIsReinicio(true);
  };
  //poppup generico reutilizable hecho para los alerts de momento
  const showPopup = (message: string) => {
    setGenericPopup({ isOpen: true, message });
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
        <h1 className="text-center text-4xl font-bold text-fondo">
          {t("menu")}
        </h1>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Button onClick={openSettings} inversed style="w-full">
            {t("settings")} ⚙️
          </Button>
          <Button onClick={openReglas} inversed style="w-full">
            {t("rules")} 📜
          </Button>
          {isGame && (
            <>
              <Button
                onClick={handleReinicio}
                inversed
                disabled={state.user.role !== "leader"}
                style="w-full"
              >
                Reiniciar Partida 🔄
              </Button>
              <Button
                onClick={() => {
                  handleGoOut({ aLobby: false });
                }}
                inversed
                style="w-full"
              >
                {t("leave_game")}❌
              </Button>
            </>
          )}
          <Button
            onClick={() => {
              handleGoOut({ aLobby: true });
            }}
            inversed
            style="w-full"
          >
            {t("exit_to_home")} 🏠
          </Button>
        </div>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          message={response}
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
        <Popup
          isOpen={isReinicio}
          onClose={() => setIsReinicio(false)}
          message={t("confirm_restart")}
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={reiniciarPartida}>{t("yes")}</Button>
            <Button onClick={() => setIsReinicio(false)} inversed>
              {t("no")}
            </Button>
          </div>
        </Popup>
        <Popup
          isOpen={genericPopup.isOpen}
          onClose={() => setGenericPopup({ isOpen: false, message: "" })}
          message={genericPopup.message}
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={() => setGenericPopup({ isOpen: false, message: "" })}
            >
              {t("close")}
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
