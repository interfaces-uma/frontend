import BackIcon from "@components/Icons/IconBack";
import Player_Cell from "@components/Player_Cell";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Lobby() {
  // Estado para el código de la sala
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate(); //para navegar entre rutas

  // Función para generar un código de sala aleatorio
  const generateRoomCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
      // Generar un dígito aleatorio entre 0 y 9
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };

  // Función para ir al home
  const goHome = () => {
    navigate("/"); // Navega a la página de inicio
  };

  // Usar useEffect para generar el código de la sala cuando el componente se monte
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setRoomCode(generateRoomCode());
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
      {/* Flecha de navegación hacia atrás */}
      <div className="absolute top-4 left-4">
        <div className="self-start">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="bg-neutral-800 rounded-full p-2" onClick={goHome}>
            <BackIcon />
          </button>
        </div>
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
          <Player_Cell>CRM</Player_Cell>
          <Player_Cell>CRM</Player_Cell>
          <Player_Cell>CRM</Player_Cell>
          <Player_Cell>Unirse...</Player_Cell>
          <Player_Cell>Unirse...</Player_Cell>
        </div>

        {/* Equipo Rojo */}
        <div className="flex-1 bg-fuerteRojo p-8 flex flex-col items-center gap-4">
          <h2 className="text-xl font-sans text-chat">EQUIPO ROJO</h2>
          <Player_Cell>CRM</Player_Cell>
          <Player_Cell>CRM</Player_Cell>
          <Player_Cell>CRM</Player_Cell>
          <Player_Cell>Unirse...</Player_Cell>
          <Player_Cell>Unirse...</Player_Cell>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
