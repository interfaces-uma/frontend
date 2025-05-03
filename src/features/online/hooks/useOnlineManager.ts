/**
 * @module useOnlineManager
 * Modulo encargado del manejo de las partidas online
 * Aqui se definen las acciones que un usuario puede hacer sobre la partida online
 */
import { useGameState } from "@/context/game/GameContext";
import type { Clue, UserActions } from "@/types";
import { socket } from "../service/socket";
// export interface UserActions {
//   setClue: (clue: Clue) => void;
//   selectCard: (cardText: Card["word"]) => void;
//   revealCard: (cardText: Card["word"]) => void;
//   nextTurn: () => void;
//   leaveGame: () => void;
// }

export const useOnlineManager = (): UserActions => {
  const { state, dispatch } = useGameState();

  const setClue = (clue: Clue) => {
    /*
    // Comprueba que la pista no contenga ninguna de las cartas seleccionadas
    const incluyeCartaSeleccionada = clue?.cards.some((c) =>
      clue?.word.replace(/\s+/g, "").toUpperCase().includes(c.word.toUpperCase())
    );
  */
    // Comprueba que la pista no contenga ninguna carta del tablero
    const incluyeCartaDelTablero = state.cards.some((c) =>
      clue?.word
        .replace(/\s+/g, "")
        .toUpperCase()
        .includes(c.word.toUpperCase()),
    );

    if (/*incluyeCartaSeleccionada ||*/ incluyeCartaDelTablero) {
      alert("La pista no puede coincidir con ninguna carta del tablero");
      return;
    }

    if (state.mode === "online") {
      socket.emit("sendClue", clue);
    }
  };

  const revealCard = (cardText: string) => {
    const card = state.cards.find((card) => card.word === cardText);
    if (!card) return;

    if (state.mode === "online") {
      socket.emit("guessCard", card);
    }
  };

  const selectCard = (cardText: string) => {
    const card = state.cards.find((card) => card.word === cardText);
    if (!card || card.color !== state.turn.team || card.isFlipped) return;

    dispatch({
      type: "SELECT_CARD",
      cardText,
    });
  };

  const nextTurn = () => {
    if (state.mode === "online") {
      // socket.emit("nextTurn");
    }
  };

  const leaveGame = () => {
    if (state.mode === "online") {
      socket.emit("leaveRoom", state.user, state.code);
    }
  };

  return {
    setClue,
    revealCard,
    selectCard,
    nextTurn,
    leaveGame,
  };
};
