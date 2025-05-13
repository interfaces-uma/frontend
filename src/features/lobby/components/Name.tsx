import { useGameState } from "@/context/game/GameContext";
import { socket } from "@/features/online/service/socket";
import Button from "@/features/shared/components/Button";
import BackIcon from "@/features/shared/components/Icons/IconBack";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import clickSound from "@/assets/newClick.mp3";
import { cuseVolume } from "@/context/clickVolume/clickVolumeContext";
import { useHoverSound } from "@/features/shared/components/HoverSound";
import Popup from "@/features/shared/components/Popup";

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

  const { cvolume } = cuseVolume();
  const { playHoverSound } = useHoverSound();

  const lastNarratedName = useRef("");
  const lastNarratedCode = useRef("");

  const [genericPopup, setGenericPopup] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    if (name && name !== lastNarratedName.current) {
      lastNarratedName.current = name;
      playHoverSound(name);
    }
  }, [name]);

  useEffect(() => {
    if (code && code !== lastNarratedCode.current) {
      lastNarratedCode.current = code;
      playHoverSound(code);
    }
  }, [code]);
  const showPopup = (message?: string) => {
    if (!message) return;
    setGenericPopup({ isOpen: true, message });
  };
  const handleClick = () => {
    if (cvolume > 0) {
      const audio = new Audio(clickSound);
      audio.volume = cvolume;
      audio.play();
    }
    handleKeyDown;
  };

  const handleMouseEnter = (name: string) => {
    playHoverSound(name);
  };

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
          showPopup(response.message);
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
          showPopup(response.message);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!unirse || (unirse && code.length === 4)) {
        handleMouseEnter("enter");
        handleMesa();
      }
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-cartas w-full max-w-md h-auto max-h-[90vh] rounded-lg flex flex-col justify-between p-6">
        <div className="self-start">
          <Button onClick={onClose} inversed circular narrator="cerrar">
            <BackIcon />
          </Button>
        </div>

        <label className="text-fondo text-2xl font-bold mb-4 mt-4">
          Nombre
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={handleClick}
            onKeyDown={(e) => handleKeyDown(e)}
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
              onKeyDown={handleKeyDown}
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
        <Popup
          isOpen={genericPopup.isOpen}
          onClose={() => setGenericPopup({ isOpen: false, message: "" })}
          message={genericPopup.message}
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={() => setGenericPopup({ isOpen: false, message: "" })}
            >
              Cerrar
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default Name;
