import clickSound from "@/assets/newClick.mp3";
import { cuseVolume } from "@/context/clickVolume/clickVolumeContext";
import { useHoverSound } from "@/features/shared/components/HoverSound";
import type React from "react";

function Button({
<<<<<<< HEAD:src/components/Button.tsx
	children,
	onClick,
	circular,
	inversed,
	disabled,
	style,
	narrator,
}: {
	children?: React.ReactNode;
	onClick: () => void;
	circular?: boolean;
	inversed?: boolean;
	disabled?: boolean;
	style?: string;
	narrator?: string;
=======
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
>>>>>>> 27d27cdd65bed3353a05188c0d7c1d92a15297da:src/features/shared/components/Button.tsx
}) {
	let buttonStyle = "";
	let buttonCircle = "";
	const { cvolume } = cuseVolume();

	const { playHoverSound } = useHoverSound();

<<<<<<< HEAD:src/components/Button.tsx
	if (
		children === "CREAR MESA" ||
		children === "CREATE GAME" ||
		children === "CRÉER UNE TABLE" ||
		children === "SPIEL ERSTELLEN"
	) {
		buttonStyle = "w-75 h-25 bg-fondoAzul hover:brightness-85 text-fondo";
	} else if (
		children === "UNIRSE A MESA" ||
		children === "JOIN GAME" ||
		children === "REJOINDRE UNE TABLE" ||
		children === "SPIEL BEITRETEN"
	) {
		buttonStyle = "w-75 h-25 bg-fondoRojo hover:brightness-85 text-fondo";
	} else if (
		children === "CREAR" ||
		children === "CREATE" ||
		children === "CRÉER" ||
		children === "ERSTELLEN"
	) {
		buttonStyle =
			"w-50 h-15 bg-chat hover:brightness-85 text-fondo justify-center";
	} else {
		buttonStyle = "bg-cartas hover:bg-yellow-100";
	}
=======
  if (children === "CREAR MESA") {
    buttonStyle = "w-75 h-25 bg-fondoAzul hover:brightness-85 text-fondo";
  } else if (children === "UNIRSE A MESA") {
    buttonStyle = "w-75 h-25 bg-fondoRojo hover:brightness-85 text-fondo";
  } else if (children === "CREAR") {
    buttonStyle =
      "w-50 h-15 bg-chat hover:brightness-85 text-fondo justify-center";
  } else {
    buttonStyle = "bg-cartas hover:brightness-50";
  }
>>>>>>> 27d27cdd65bed3353a05188c0d7c1d92a15297da:src/features/shared/components/Button.tsx

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

<<<<<<< HEAD:src/components/Button.tsx
	if (children === "¡Entendido!") {
		buttonStyle = "bg-fondo hover:brightness-85 text-cartas";
	}
=======
  if (children === "¡Entendido!") {
    buttonStyle = "bg-fondo hover:brightness-85 text-cartas hover:bg-fondo";
  }
>>>>>>> 27d27cdd65bed3353a05188c0d7c1d92a15297da:src/features/shared/components/Button.tsx

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

<<<<<<< HEAD:src/components/Button.tsx
	return (
		<button
			type="button"
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			disabled={disabled}
			className={`${buttonCircle} ${buttonStyle} ${style} transition duration-300 ease-in-out cursor-pointer`}
		>
			{children}
		</button>
	);
=======
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
>>>>>>> 27d27cdd65bed3353a05188c0d7c1d92a15297da:src/features/shared/components/Button.tsx
}

export default Button;
