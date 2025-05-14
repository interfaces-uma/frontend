import Button from "@/features/shared/components/Button";
import BackIcon from "@/features/shared/components/Icons/IconBack";
import { useNavigate } from "react-router-dom";
import { type ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
  // Maneja el clic fuera del popup
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  const navigate = useNavigate();

  // Lógica para renderizar uno de los tres posibles popups
  const renderPopup = () => {
    if (showWelcome) {
      return (
        <BasePopup
          onClose={() => setShowWelcome(false)}
          message={t("Welcome to the game!")}
          description={t("Do you already know how to play?")}
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={handleKnowsGame}>{t("yes")}</Button>
            <Button onClick={handleDoesNotKnowGame} inversed>
              {t("no")}
            </Button>
          </div>
        </BasePopup>
      );
    }

    if (showExplanation) {
      return (
        <BasePopup
          onClose={() => setShowExplanation(false)}
          // biome-ignore lint/style/useTemplate: <explanation>
          message={t("how_to_play") + "?"}
          description={t("description")}
        >
          <div className="flex justify-center gap-4 mt-4">
            <Button
              style="border-3 border-fondo"
              onClick={() => {
                navigate("/tutorial");
                setShowExplanation(false);
              }}
            >
              {t("play")} + {t("tutorial")}
            </Button>
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
  // Maneja el clic fuera del popup
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Agrega el evento de clic
    >
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
