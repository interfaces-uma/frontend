import { useState } from "react";

import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import PlayerCell from "@/components/PlayerCell";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import Chat from "@/features/chat/components/Chat";
import { useNavigate } from "react-router";
import { useLobbyManager } from "./hooks/useLobbyManager";

import { useGameState } from "@/context/game/GameContext";
import { socket } from "@/features/online/service/socket";

function Lobby() {
  const MAX_TEAM_SIZE = 5;
  const manager = useLobbyManager();
  const navigate = useNavigate();

  const { state } = useGameState();

  const roomCode = manager.getRoomCode();
  const [showSettings, setShowSettings] = useState(false);

  function fillTeam(team: string[], size = MAX_TEAM_SIZE): string[] {
    const filled = [...team];
    while (filled.length < size) {
      filled.push("Unirse...");
    }
    return filled;
  }

  const teams = manager.getTeams();
  const blueTeam = fillTeam([
    teams.blue.leader?.name ?? "Unirse...",
    ...teams.blue.agents.map((player) => player.name),
  ]);
  const redTeam = fillTeam([
    teams.red.leader?.name ?? "Unirse...",
    ...teams.red.agents.map((player) => player.name),
  ]);

  const openSettings = () => setShowSettings(!showSettings);

  const goHome = () => {
    //Habría que añadir un popPup o ventana emergente informando de que va a salir de la sala y/o es la ultima persona en salir
    socket.emit("leaveRoom", state.user, state.code);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="absolute top-4 left-4">
        <Button onClick={goHome} inversed circular>
          <BackIcon stroke="fondo" />
        </Button>
        <Timer duration={60000} />
      </div>

      <div className="absolute top-4 right-4">
        <Button onClick={openSettings} circular inversed>
          <SettingsIcon fill="currentColor" className="cartas" />
        </Button>
      </div>

      <div className="bg-fondo text-cartas py-2 px-4 rounded-t-lg text-center mb-2">
        <div className="text-xs">CÓDIGO DE SALA</div>
        <div className="text-xl font-bold tracking-widest">
          {roomCode || "****"}
        </div>
      </div>

      <div className="flex w-full max-w-3xl h-[400px]">
        <div className="flex-1 bg-fuerteAzul p-8 flex flex-col items-center gap-4">
          <h2 className="text-xl font-sans text-chat">EQUIPO AZUL</h2>
          {blueTeam.map((player, index) => (
            <PlayerCell
              key={index}
              onClick={() =>
                manager.joinSlot("blue", index === 0 ? "leader" : "agent")
              }
            >
              {player}
            </PlayerCell>
          ))}
        </div>
        <div className="flex-1 bg-fuerteRojo p-8 flex flex-col items-center gap-4">
          <h2 className="text-xl font-sans text-chat">EQUIPO ROJO</h2>
          {redTeam.map((player, index) => (
            <PlayerCell
              key={index}
              onClick={() =>
                manager.joinSlot("red", index === 0 ? "leader" : "agent")
              }
            >
              {player}
            </PlayerCell>
          ))}
        </div>
        <div className="flex-1 top-0 right-0 ">
          <Chat />
        </div>
      </div>

      {showSettings && <Settings onClose={openSettings} roomCode={roomCode} />}
    </div>
  );
}

export default Lobby;
