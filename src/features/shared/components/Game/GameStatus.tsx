import { useGameState } from "@/context/game/GameContext";
import { useEffect, useState } from "react";
import i18next from "i18next";

const t = i18next.t;

/** Componente que informa del estado de la partida
 * Muestra en un label de quien es el turno y que debes hacer
 */
const GameStatus = () => {
  const { state } = useGameState();

  const roleTurn = state.turn.role;
  const teamTurn = state.turn.team;

  // si es mi turno que me explique que tengo que hacer
  // si no es mi turno informarme de a quien le toca

  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let info = "";

    if (state.user.role === roleTurn && state.user.color === teamTurn) {
      if (roleTurn === "leader") {
        info = t("rL1");
      }
      if (roleTurn === "agent") {
        info = t("rA1");
      }
    }

    if (state.user.role !== roleTurn && state.user.color === teamTurn) {
      if (roleTurn === "leader") {
        info = t("rL2");
      }
      if (roleTurn === "agent") {
        info = t("rA2");
      }
    }

    if (state.user.color !== teamTurn) {
      if (roleTurn === "leader") {
        info = t("rL3");
      }
      if (roleTurn === "agent") {
        info = t("rA3");
      }
    }

    if (typedText === info) {
      return;
    }

    let currentIndex = 0;
    const duration = 2500; // 1 segundo
    const interval = duration / info.length;

    const intervalId = setInterval(() => {
      currentIndex += 1;
      setTypedText(info.slice(0, currentIndex));

      if (currentIndex >= info.length) {
        clearInterval(intervalId);
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [state.user, state.turn]);

  return (
    <div className="bg-amber-50 rounded-2xl text-center p-1">
      <h2>{typedText}</h2>
    </div>
  );
};

export default GameStatus;
