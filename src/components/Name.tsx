import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import { useGameState } from "@/context/game/GameContext";
import { useState } from "react";
import { useNavigate } from "react-router";
import { socket } from "@/features/online/service/socket";

function Name({
  onClose,
  unirse,
}: {
  onClose: () => void;
  unirse?: boolean;
}) {
  const navigate = useNavigate();
  const { dispatch } = useGameState();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const handleMesa = async () => {
    const user = { name, id: name, color: null, role: null };
    await localStorage.setItem("name", name);
    dispatch({
      type: "SET_USER",
      user,
    });

    if (!unirse) {
      socket.emit("createRoom", user, (response) => {
        if (!response.success) {
          alert(response.message);
        } else {
          navigate("/lobby", {
            state: {
              unirse,
              codigo: unirse ? Number(code) : undefined,
            },
          });
        }
      });
    } else {
      socket.emit("joinRoom", user, code, (response) => {
        if (!response.success) {
          alert(response.message);
        } else {
          navigate("/lobby", {
            state: {
              unirse,
              codigo: unirse ? Number(code) : undefined,
            },
          });
        }
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cartas w-full max-w-md h-auto max-h-[90vh] rounded-lg flex flex-col justify-between p-6">
        <div className="self-start">
          <Button onClick={onClose} inversed circular>
            <BackIcon />
          </Button>
        </div>

        <label className="text-fondo text-2xl font-bold mb-4 mt-4">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b-2 border-fondo text-fondo text-2xl font-bold mb-4 focus:outline-none w-full"
            placeholder="Escribe tu nombre"
          />
        </label>

        {unirse && (
          <label className="text-fondo text-2xl font-bold mb-4 mt-4">
            Código de sala
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={code}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/[^0-9]/g, "");
                setCode(cleaned);
              }}
              className="bg-transparent border-b-2 border-fondo text-fondo text-2xl font-bold mb-4 focus:outline-none w-full"
              placeholder="Introduzca el código de la sala"
            />
          </label>
        )}

        <div className="flex flex-col items-center justify-center h-full">
          <Button
            onClick={handleMesa}
            inversed
            disabled={unirse && code.length !== 4}
          >
            {unirse ? "UNIRSE" : "CREAR"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Name;
