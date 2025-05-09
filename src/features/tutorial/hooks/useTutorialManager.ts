import { useGameState } from "@/context/game/GameContext";
import initialState from "@/features/tutorial/initialState";
import type { Card, Clue, TutorialActions, UserActions } from "@/types";

export const useTutorialManager = (): UserActions & TutorialActions => {
  const { state, dispatch } = useGameState();

  const isMyTurn = () => {
    const roleTurn = state.turn.role;
    const teamTurn = state.turn.team;

    if (state.user.role === roleTurn && state.user.color === teamTurn) {
      return true;
    }
    return false;
  };

  const setClue = (clue: Clue) => {
    if (!isMyTurn()) return;
    if (!clue) return;
    // Comprueba que la pista no contenga ninguna carta del tablero
    const incluyeCartaDelTablero = state.cards.some((card: Card) =>
      clue.word
        .replace(/\s+/g, "")
        .toUpperCase()
        .includes(card.word.toUpperCase()),
    );

    if (/*incluyeCartaSeleccionada ||*/ incluyeCartaDelTablero) {
      alert("La pista no puede coincidir con ninguna carta del tablero");
      return;
    }

    if (state.mode === "online") {
    }
  };

  const revealCard = (cardText: string) => {
    if (!isMyTurn()) return;
    const card = state.cards.find((card: Card) => card.word === cardText);
    if (!card) return;

    if (state.mode === "online") {
    }
  };

  const selectCard = (cardText: string) => {
    if (!isMyTurn()) return;
    const card = state.cards.find((card: Card) => card.word === cardText);
    if (!card || card.color !== state.turn.team || card.isFlipped) return;

    dispatch({
      type: "SELECT_CARD",
      cardText,
    });
  };

  const nextTurn = () => {
    if (!isMyTurn()) return;
    if (state.mode === "online") {
    }
  };

  const leaveGame = () => {
    if (state.mode === "online") {
    }
  };

  const setInitialState = () => {
    dispatch({
      type: "SET_STATE",
      state: initialState,
    });
    dispatch({
      type: "SET_USER",
      user: initialState.user,
    });
  };

  return {
    setClue,
    revealCard,
    selectCard,
    nextTurn,
    leaveGame,
    isMyTurn,
    setInitialState,
  };
};
