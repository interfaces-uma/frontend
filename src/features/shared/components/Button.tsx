import clickSound from "@/assets/newClick.mp3";
import { cuseVolume } from "@/context/clickVolume/clickVolumeContext";
import { useHoverSound } from "@/features/shared/components/HoverSound";
import type React from "react";

function Button({
  children,
  onClick,
  circular,
  inversed,
  disabled,
  style,
  narrator,
  id,
}: {
  children?: React.ReactNode;
  onClick: () => void;
  circular?: boolean;
  inversed?: boolean;
  disabled?: boolean;
  style?: string;
  narrator?: string;
  id?: string;
}) {
  let buttonStyle = "";
  let buttonCircle = "";
  const { cvolume } = cuseVolume();

  const { playHoverSound } = useHoverSound();

  if (
    children === "CREAR MESA" ||
    children === "CREATE GAME" ||
    children === "SPIEL ERSTELLEN" ||
    children === "CRÉER UNE TABLE" ||
    children === "创建游戏"
  ) {
    buttonStyle = "w-75 h-25 bg-fondoAzul hover:brightness-85 text-fondo";
  } else if (
    children === "UNIRSE A MESA" ||
    children === "JOIN GAME" ||
    children === "SPIEL BEITRETEN" ||
    children === "REJOINDRE UNE TABLE" ||
    children === "加入游戏"
  ) {
    buttonStyle = "w-75 h-25 bg-fondoRojo hover:brightness-85 text-fondo";
  } else if (
    children === "CREAR" ||
    children === "CREATE" ||
    children === "SPIELEN" ||
    children === "JOUER" ||
    children === "创建"
  ) {
    buttonStyle =
      "w-50 h-15 bg-chat hover:brightness-85 text-fondo justify-center";
  } else {
    buttonStyle = "bg-cartas hover:brightness-50";
  }

  if (inversed) {
    buttonStyle = "bg-fondo hover:brightness-85 text-cartas";
  }

  if (circular) {
    buttonCircle = "px-3 py-3 rounded-full";
  } else {
    buttonCircle = "w-36 h-12 rounded-xl";
  }

  if (disabled) {
    buttonStyle = "bg-white text-gray-400 cursor-not-allowed";
  }

  if (
    children === "¡Entendido!" ||
    children === "Got it!!" ||
    children === "Verstanden!" ||
    children === "Compris!" ||
    children === "明白了!"
  ) {
    buttonStyle = "bg-fondo hover:brightness-85 text-cartas hover:bg-fondo";
  }

  const handleClick = () => {
    // Reproducir sonido de clic
    if (cvolume > 0) {
      const audio = new Audio(clickSound);
      audio.volume = cvolume;
      audio.play();
    }
    if (disabled) return;

    // Ejecutar lógica del botón
    onClick?.();
  };

  const handleMouseEnter = () => {
    const narrationText =
      narrator ?? (typeof children === "string" ? children : "");
    playHoverSound(narrationText);
  };

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      className={`${buttonCircle} ${buttonStyle} ${style} transition duration-300 ease-in-out cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default Button;
