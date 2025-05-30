import { useGameState } from "@/context/game/GameContext";
import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ClueInputProps {
  onSend: (clueWord: string) => void;
  disabled?: boolean;
}

/**
 * Componente de input para escribir y enviar la pista del líder.
 * Gestiona su propio estado y obtiene las cartas seleccionadas del contexto de juego.
 */
const ClueInput: React.FC<ClueInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");
  const { state } = useGameState();
  const selectedCards = state.cards.filter((card) => card.isSelected);
  const { t } = useTranslation();
  const handleSend = () => {
    if (input.trim() === "" || selectedCards.length === 0) return;
    onSend(input.trim());
    setInput("");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      id="input-clue"
      className="flex gap-2 items-center w-full p-2 rounded bg-cartas"
    >
      <input
        aria-label={t("write_clue")}
        className="flex-1 text-center text-xl bg-cartas outline-none border-none placeholder:text-fondo focus:ring-0 uppercase"
        value={input.toUpperCase()}
        type="text"
        placeholder={t("write_clue")}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        style={{ boxShadow: "none" }}
      />
      <button
        type="button"
        className="bg-fondo px-4 py-2 rounded text-cartas font-bold cursor-pointer transition-transform duration-200 hover:scale-105"
        onClick={handleSend}
        disabled={disabled || input.trim() === "" || selectedCards.length === 0}
      >
        {t("send")}
      </button>
    </div>
  );
};

export default ClueInput;
