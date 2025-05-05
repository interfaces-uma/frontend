import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import MenuIcon from "@/components/Icons/IconMenu";
import PlayerCell from "@/components/PlayerCell";
import Popup from "@/components/Popup";
import { useGameState } from "@/context/game/GameContext";
import { socket } from "@/features/online/service/socket";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLobbyManager } from "./hooks/useLobbyManager";

import backgroundMusic from "@/assets/lobbymusic.mp3";
import FullScreenIcon from "@/components/Icons/IconFullScreen";
import Menu from "@/components/Menu";
import { useVolume } from "@/context/backgroundVolume/backgroundVolumeContext";
import type { User } from "@/types";

function Lobby() {
  const MAX_TEAM_SIZE = 5;
  const manager = useLobbyManager();
  const navigate = useNavigate();
  const { state } = useGameState();

  const roomCode = manager.getRoomCode();
  localStorage.setItem("roomCode", roomCode);
  const [showMenu, setShowMenu] = useState(false);

  //PARA LA MUSICA DE FONDO ↓
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { volume } = useVolume();

  useEffect(() => {
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current
      .play()
      .catch((err) => console.error("Error al reproducir música:", err));

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  //PARA LA MUSICA DE FONDO ↑

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirmExit = () => {
    manager.leaveGame();
    navigate("/");
  };

  const handleBackClick = () => {
    setIsPopupOpen(true);
  };

  const fillTeam = (team: string[], size = MAX_TEAM_SIZE): string[] => {
    const filled = [...team];
    while (filled.length < size) {
      filled.push("Unirse...");
    }
    return filled;
  };

  const renderName = (player: User | null, me: User): string => {
    if (player === null) {
      return "Unirse...";
    }
    if (player.name === me.name) {
      return `${player.name} (Yo)`;
    }
    return player.name;
  };

  const teams = manager.getTeams();
  const blueTeam = fillTeam([
    renderName(teams.blue.leader, state.user),
    ...teams.blue.agents.map((player) => renderName(player, state.user)),
  ]);
  const redTeam = fillTeam([
    renderName(teams.red.leader, state.user),
    ...teams.red.agents.map((player) => renderName(player, state.user)),
  ]);

  const players = manager.getPlayers();
  const noTeamPlayers = players.map((player) => renderName(player, state.user));

  const openMenu = () => setShowMenu(!showMenu);

  const goHome = () => {
    socket.emit("leaveRoom", state.user, state.code);
    navigate("/");
  };

  useEffect(() => {
    socket.on("redirectGame", () => {
      alert("La partida ha comenzado");
      navigate("/game");
    });

    return () => {
      socket.off("redirectGame");
    };
  }, []);

  const handleLeaveTeam = () => {
    manager.leaveTeam();
  };

  return (
    <div className="flex h-screen">
      {/* Botón salir */}
      <section
        id="botonSalir"
        className="absolute top-2 left-2 xl:top-7 xl:left-7 z-10"
      >
        <Button onClick={handleBackClick} inversed circular>
          <BackIcon stroke="fondo" />
        </Button>
      </section>

      {/* Room code */}
      <section
        id="roomCode"
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="bg-fondo text-cartas py-2 px-4 rounded-b-2xl text-center">
          <div className="text-xs">CÓDIGO DE SALA</div>
          <div className="text-xl font-bold tracking-widest">
            {roomCode || "****"}
          </div>
        </div>
      </section>

      {/* Botón ajustes */}
      <section className="absolute flex flex-col gap-2 top-2 right-2 xl:top-7 xl:right-7 z-10">
        <Button onClick={openMenu} circular inversed>
          <MenuIcon
            fill="currentColor"
            className="cartas"
            width={20}
            height={20}
          />
        </Button>

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
      </section>

      {/* Boton jugar */}
      <section
        id="botonJugar"
        className="absolute left-1/2 bottom-7 transform -translate-x-1/2 z-10 w-[15%] h-[10%] rounded-xl bg-fondo text-cartas lg:text-3xl"
      >
        <button
          type="button"
          disabled={state.isGameStarted}
          onClick={() => {
            manager.startGame();
          }}
          className="w-full h-full cursor-pointer"
        >
          {state.isGameStarted ? "PARTIDA EN CURSO" : "JUGAR"}
        </button>
      </section>

      {/* No team players */}
      <section
        id="jugadoresSinEquipo"
        className="absolute z-10 left-1/2 top-1/2 transform -translate-1/2 w-[20%] bg-cartas flex flex-col items-center gap-4 flex-1 text-center rounded-xl text-xs lg:text-lg h-[50%]"
      >
        <h2 className="font-sans text-fondo mt-2">JUGADORES SIN EQUIPO</h2>
        <ul className="flex-1 overflow-y-auto w-full h-full">
          {noTeamPlayers.map((player) => (
            <li key={player}>{player}</li>
          ))}
        </ul>
        {noTeamPlayers.length === 0 && (
          <p className="text-xs text-fondo">No hay jugadores sin equipo</p>
        )}

        <button
          type="button"
          onClick={handleLeaveTeam}
          className="bg-fondo text-cartas w-full h-10 rounded-b-lg cursor-pointer mt-auto"
        >
          SALIR DEL EQUIPO
        </button>
      </section>

      {/* Blue team */}
      <section id="blueSection" className="bg-blue-500 w-full relative">
        <div className="bg-blue-400 px-10 rounded-xl absolute left-[10%]  top-1/2 transform -translate-y-1/2 text-center h-[80%] xl:h-[50%] w-[65%] justify-center content-center">
          <h2 className="text-xl font-sans text-chat">EQUIPO AZUL</h2>
          {blueTeam.map((player, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <h1 className="mb-2">Capitán</h1>
                  <PlayerCell
                    key={index}
                    onClick={() =>
                      manager.joinSlot("blue", index === 0 ? "leader" : "agent")
                    }
                  >
                    {player}
                  </PlayerCell>
                  <h1 className="my-2">Agentes</h1>
                </div>
              );
            }
            return (
              <div key={index} className="mb-2">
                <PlayerCell
                  key={index}
                  onClick={() =>
                    manager.joinSlot("blue", index === 0 ? "leader" : "agent")
                  }
                >
                  {player}
                </PlayerCell>
              </div>
            );
          })}
        </div>
      </section>

      {/* Red team */}
      <section id="redSection" className="bg-red-500 w-full relative">
        <div className="bg-red-400 px-10 rounded-xl absolute right-[10%] top-1/2 transform  -translate-y-1/2 text-center h-[80%] xl:h-[50%] w-[65%] justify-center content-center">
          <h2 className="text-xl font-sans text-chat">EQUIPO ROJO</h2>
          {redTeam.map((player, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <h1 className="mb-2">Capitán</h1>
                  <PlayerCell
                    key={index}
                    onClick={() =>
                      manager.joinSlot("red", index === 0 ? "leader" : "agent")
                    }
                  >
                    {player}
                  </PlayerCell>
                  <h1 className="my-2">Agentes</h1>
                </div>
              );
            }
            return (
              <div key={index} className="mb-2">
                <PlayerCell
                  key={index}
                  onClick={() =>
                    manager.joinSlot("red", index === 0 ? "leader" : "agent")
                  }
                >
                  {player}
                </PlayerCell>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ajustes */}
      {/* {showSettings && <Settings onClose={openSettings} roomCode={roomCode} />} */}
      {/* Menu */}
      {showMenu && <Menu onClose={openMenu} />}

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="¿Seguro que quieres salir de la sala de espera?"
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

export default Lobby;
