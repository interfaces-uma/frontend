/**
 * @module useOnlineManager
 * Modulo encargado del manejo de las partidas online
 * Aqui se definen las acciones que un usuario puede hacer sobre la partida online
 */
import { useGameState } from "@/context/game/GameContext";
import type { Clue, UserActions } from "@/types";
import { socket } from "../service/socket";
import { useState } from "react";

export const useOnlineManager = (): UserActions => {
  const { state, dispatch } = useGameState();

  const isMyTurn = () => {
    const roleTurn = state.turn.role;
    const teamTurn = state.turn.team;

    if (state.user.role === roleTurn && state.user.color === teamTurn) {
      return true;
    }
    return false;
  };
  const [genericPopup, setGenericPopup] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: "",
  });
  const showPopup = (message?: string) => {
    if (!message) {
      setGenericPopup({ isOpen: false, message: "" });
    } else {
      setGenericPopup({ isOpen: true, message });
    }
  };

  const setClue = (clue: Clue) => {
    if (!isMyTurn()) return;
    // Comprueba que la pista no contenga ninguna carta del tablero
    const incluyeCartaDelTablero = state.cards.some((c) =>
      clue?.word
        .replace(/\s+/g, "")
        .toUpperCase()
        .includes(c.word.toUpperCase()),
    );

    if (/*incluyeCartaSeleccionada ||*/ incluyeCartaDelTablero) {
      showPopup("La pista no puede coincidir con ninguna carta del tablero");
      return;
    }

    if (state.mode === "online") {
      socket.emit("sendClue", clue);
    }
  };

  const revealCard = (cardText: string) => {
    if (!isMyTurn()) return;
    const card = state.cards.find((card) => card.word === cardText);
    if (!card) return;

    if (state.mode === "online") {
      socket.emit("guessCard", card);
    }
  };

  const selectCard = (cardText: string) => {
    if (!isMyTurn()) return;
    const card = state.cards.find((card) => card.word === cardText);
    if (!card || card.color !== state.turn.team || card.isFlipped) return;

    dispatch({
      type: "SELECT_CARD",
      cardText,
    });
  };

  const nextTurn = () => {
    if (!isMyTurn()) return;
    if (state.mode === "online") {
      socket.emit("nextTurn");
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
    isMyTurn,
    showPopup,
    genericPopup,
  };
};
