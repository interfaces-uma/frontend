import { useGameState } from "@/context/game/GameContext";
import { useEffect, useState } from "react";

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
        info =
          "Es tu turno, selecciona cartas y asocialas a una palabra clave...";
      }
      if (roleTurn === "agent") {
        info = "Es tu turno, selecciona las cartas que creas correctas...";
      }
    }

    if (state.user.role !== roleTurn && state.user.color === teamTurn) {
      if (roleTurn === "leader") {
        info = "Es el turno de tu líder, espera a que te de una pista...";
      }
      if (roleTurn === "agent") {
        info =
          "Es el turno de tus agentes, espera a que adivinen las cartas...";
      }
    }

    if (state.user.color !== teamTurn) {
      if (roleTurn === "leader") {
        info = "El lider enemigo está dando una pista a sus agentes...";
      }
      if (roleTurn === "agent") {
        info =
          "Es el turno de los agentes enemigos, espera a que adivinen las cartas...";
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
      <p>{typedText}</p>
    </div>
  );
};

export default GameStatus;
