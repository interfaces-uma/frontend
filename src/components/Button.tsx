import type React from "react";
import clickSound from "@/assets/click.mp3";

function Button({
	children,
	onClick,
	circular,
	inversed,
	disabled,
}: {
	children?: React.ReactNode;
	onClick: () => void;
	circular?: boolean;
	inversed?: boolean;
	disabled?: boolean;
}) {
	let buttonStyle = "";
	let buttonCircle = "";

	if (children === "CREAR MESA") {
		buttonStyle = "w-75 h-25 bg-fondoAzul hover:brightness-85 text-fondo";
	} else if (children === "UNIRSE A MESA") {
		buttonStyle = "w-75 h-25 bg-fondoRojo hover:brightness-85 text-fondo";
	} else if (children === "CREAR") {
		buttonStyle =
			"w-50 h-15 bg-chat hover:brightness-85 text-fondo justify-center";
	} else {
		buttonStyle = "bg-cartas hover:bg-yellow-100";
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

	if (children === "¡Entendido!") {
		buttonStyle = "bg-fondo hover:brightness-85 text-cartas";
	}

	const handleClick = () => {
		if (disabled) return;

		// Clonamos el audio para que no se interrumpa si se hace click rápido
		const click = new Audio(clickSound);
		click.volume = 0.3; // Volumen Click
		click.play().catch(() => {});

		// Ejecutar lógica del botón
		onClick?.();
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={disabled}
			className={`${buttonCircle} ${buttonStyle} transition duration-300 ease-in-out cursor-pointer`}
		>
			{children}
		</button>
	);
}

export default Button;
