import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import PlayerCell from "@/components/PlayerCell";
import Settings from "@/components/Settings";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Lobby({
  codigo,
}: {
  codigo?: number;
}) {
  const name = localStorage.getItem("name") || "Unirse...";

  //Ajustes
  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => {
    setShowSettings(!showSettings);
  };

  const [blueTeam, setBlueTeam] = useState<Array<string>>([
    "Unirse...",
    "Unirse...",
    "Unirse...",
    "Unirse...",
    "Unirse...",
  ]);
  const [redTeam, setRedTeam] = useState<Array<string>>([
    "Unirse...",
    "Unirse...",
    "Unirse...",
    "Unirse...",
    "Unirse...",
  ]);
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const generateRoomCode = () => {
    let code = "";
    if (codigo) {
      return codigo.toString();
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10);
      }
      return code;
    }
  };

  // Función para ir al home
  const goHome = () => {
    navigate("/"); // Navega a la página de inicio
  };

  const handleJoinClick = (team: "blue" | "red", index: number) => {
    const updatedBlueTeam = [...blueTeam];
    const updatedRedTeam = [...redTeam];
    if (team === "blue") {
      if (blueTeam[index] === name) {
        // Si ya esta tu nombre lo quitas

        updatedBlueTeam[index] = "Unirse...";
      } else if (blueTeam[index] === "Unirse...") {
        for (let i = 0; i < 5; i++) {
          if (blueTeam[i] === name) {
            updatedBlueTeam[i] = "Unirse...";
          }
          if (redTeam[i] === name) {
            updatedRedTeam[i] = "Unirse...";
          }
        }

        updatedBlueTeam[index] = name;
      }
      setRedTeam(updatedRedTeam);
      setBlueTeam(updatedBlueTeam);
    } else {
      if (redTeam[index] === name) {
        // Si ya esta tu nombre lo quitas

        updatedRedTeam[index] = "Unirse...";
      } else if (redTeam[index] === "Unirse...") {
        for (let i = 0; i < 5; i++) {
          if (redTeam[i] === name) {
            updatedRedTeam[i] = "Unirse...";
          }
        }
        for (let j = 0; j < updatedBlueTeam.length; j++) {
          if (blueTeam[j] === name) {
            updatedBlueTeam[j] = "Unirse...";
          }
        }
        updatedRedTeam[index] = name;
      }

      setRedTeam(updatedRedTeam);
      setBlueTeam(updatedBlueTeam);
    }
  };

  // Usar useEffect para generar el código de la sala cuando el componente se monte
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setRoomCode(generateRoomCode());
  }, [codigo]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
      {/* Flecha de navegación hacia atrás */}

      <div className="absolute top-4 left-4">
        <Button onClick={goHome} inversed circular>
          <BackIcon stroke="fondo" />
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <Button onClick={openSettings} circular inversed>
          <SettingsIcon fill="currentColor" className="cartas" />
        </Button>
      </div>

      {/* Código de sala */}
      <div className="bg-neutral-800 text-white py-2 px-4 rounded-t-lg text-center mb-2">
        <div className="text-xs">CÓDIGO DE SALA</div>
        <div className="text-xl font-bold tracking-widest">{roomCode}</div>
      </div>

      {/* Equipos */}
      <div className="flex w-full max-w-3xl h-[400px]">
        {/* Equipo Azul */}
        <div className="flex-1 bg-fuerteAzul p-8 flex flex-col items-center gap-4">
          <h2 className="text-xl font-sans text-chat">EQUIPO AZUL</h2>
          {blueTeam.map((player, index) => (
            <PlayerCell
              key={index}
              onClick={() => handleJoinClick("blue", index)}
            >
              {player}
            </PlayerCell>
          ))}
        </div>

        {/* Equipo Rojo */}
        <div className="flex-1 bg-fuerteRojo p-8 flex flex-col items-center gap-4">
          <h2 className="text-xl font-sans text-chat">EQUIPO ROJO</h2>
          {redTeam.map((player, index) => (
            <PlayerCell
              key={index}
              onClick={() => handleJoinClick("red", index)}
            >
              {player}
            </PlayerCell>
          ))}
        </div>
      </div>
      {showSettings && <Settings onClose={openSettings} roomCode={roomCode} />}
    </div>
  );
}

export default Lobby;
