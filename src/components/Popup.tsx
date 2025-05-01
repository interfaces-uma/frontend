import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import { useEffect, useState, type ReactNode } from "react";

type PopupProps = {
	isOpen?: boolean;
	onClose?: () => void;
	message?: string;
	description?: string;
	children?: ReactNode;
	autoWelcome?: boolean; // Nueva prop para habilitar bienvenida automática
};

function Popup({
	isOpen,
	onClose,
	message,
	description,
	children,
	autoWelcome = false,
}: PopupProps) {
	const [showWelcome, setShowWelcome] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);

	useEffect(() => {
		if (autoWelcome && !localStorage.getItem("hasVisited")) {
			localStorage.setItem("hasVisited", "true");
			setShowWelcome(true);
		}
	}, [autoWelcome]);

	const handleKnowsGame = () => setShowWelcome(false);
	const handleDoesNotKnowGame = () => {
		setShowWelcome(false);
		setShowExplanation(true);
	};

	// Lógica para renderizar uno de los tres posibles popups
	const renderPopup = () => {
		if (showWelcome) {
			return (
				<BasePopup
					onClose={() => setShowWelcome(false)}
					message="¡Bienvenido al juego!"
					description="¿Ya conoces cómo se juega?"
				>
					<div className="flex justify-center gap-4 mt-4">
						<Button onClick={handleKnowsGame}>Sí</Button>
						<Button onClick={handleDoesNotKnowGame} inversed>
							No
						</Button>
					</div>
				</BasePopup>
			);
		}

		if (showExplanation) {
			return (
				<BasePopup
					onClose={() => setShowExplanation(false)}
					message="¿Cómo se juega?"
					description="Código Secreto es un juego por equipos donde
           un líder da pistas para que sus compañeros adivinen palabras ocultas. 
           El reto es evitar las palabras del rival… ¡y sobre todo la palabra de color negro! 💣"
				>
					<div className="flex justify-center mt-4">
						<Button onClick={() => setShowExplanation(false)}>
							¡Entendido!
						</Button>
					</div>
				</BasePopup>
			);
		}

		if (isOpen) {
			return (
				<BasePopup
					onClose={onClose}
					message={message}
					description={description}
				>
					{children}
				</BasePopup>
			);
		}

		return null;
	};

	return renderPopup();
}

// Subcomponente reutilizable para estructura base del popup
function BasePopup({
	onClose,
	message,
	description,
	children,
}: {
	onClose?: () => void;
	message?: string;
	description?: string;
	children?: ReactNode;
}) {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-cartas p-6 rounded shadow-lg max-w-sm w-full relative">
				{onClose && (
					<div className="absolute top-2 left-2">
						<Button onClick={onClose} inversed circular>
							<BackIcon />
						</Button>
					</div>
				)}
				{message && <p className="mb-4 mt-8 text-center text-2xl">{message}</p>}
				{description && (
					<p className="text-center text-sm text-black-300 mb-4">
						{description}
					</p>
				)}
				{children}
			</div>
		</div>
	);
}

export default Popup;
