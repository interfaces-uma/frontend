import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Chat from "@/components/Chat";
import BackIcon from "@/components/Icons/IconBack";
import SettingsIcon from "@/components/Icons/IconSettings";
import PlayerCell from "@/components/PlayerCell";
import Settings from "@/components/Settings";
import { useLocation, useNavigate } from "react-router"; // 👈 importa useLocation

function Lobby() {
  const location = useLocation();
  const navigate = useNavigate();

  const { codigo } = location.state || {};

  const name = localStorage.getItem("name") || "Unirse...";

  const [showSettings, setShowSettings] = useState(false);
  const [blueTeam, setBlueTeam] = useState<Array<string>>(
    Array(5).fill("Unirse..."),
  );
  const [redTeam, setRedTeam] = useState<Array<string>>(
    Array(5).fill("Unirse..."),
  );
  const [roomCode, setRoomCode] = useState("");

  const openSettings = () => setShowSettings(!showSettings);

  const goHome = () => navigate("/");

  const generateRoomCode = () => {
    if (codigo) return codigo.toString();
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };

  useEffect(() => {
    setRoomCode(generateRoomCode());
  }, [codigo]);

  const handleJoinClick = (team: "blue" | "red", index: number) => {
    const updatedBlue = [...blueTeam];
    const updatedRed = [...redTeam];

    if (team === "blue") {
      if (blueTeam[index] === name) {
        updatedBlue[index] = "Unirse...";
        localStorage.setItem("team", "");
      } else if (blueTeam[index] === "Unirse...") {
        for (let i = 0; i < 5; i++) {
          if (blueTeam[i] === name) updatedBlue[i] = "Unirse...";
          if (redTeam[i] === name) updatedRed[i] = "Unirse...";
        }
        updatedBlue[index] = name;
        localStorage.setItem("team", "blue");
      }
    } else {
      if (redTeam[index] === name) {
        updatedRed[index] = "Unirse...";
        localStorage.setItem("team", "");
      } else if (redTeam[index] === "Unirse...") {
        for (let i = 0; i < 5; i++) {
          if (redTeam[i] === name) updatedRed[i] = "Unirse...";
          if (blueTeam[i] === name) updatedBlue[i] = "Unirse...";
        }
        updatedRed[index] = name;
        localStorage.setItem("team", "red");
      }
    }

    setBlueTeam(updatedBlue);
    setRedTeam(updatedRed);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
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

      <div className="bg-fondo text-cartas py-2 px-4 rounded-t-lg text-center mb-2">
        <div className="text-xs">CÓDIGO DE SALA</div>
        <div className="text-xl font-bold tracking-widest">{roomCode}</div>
      </div>

      <div className="flex w-full max-w-3xl h-[400px]">
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
        <div className="flex-1 top-0 right-0 ">
          <Chat />
        </div>
      </div>

      {showSettings && <Settings onClose={openSettings} roomCode={roomCode} />}
    </div>
  );
}

export default Lobby;
