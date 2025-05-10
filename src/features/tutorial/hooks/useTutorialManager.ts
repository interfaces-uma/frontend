import { useGameState } from "@/context/game/GameContext";
import initialState from "@/features/tutorial/initialState";
import type { Card, Clue, TutorialActions, UserActions } from "@/types";
import { useState } from "react";
import steps from "@/features/tutorial/tutorialSteps";

export const useTutorialManager = (): UserActions & TutorialActions => {
  const { state, dispatch } = useGameState();
  const [step, setStep] = useState<number>(0);
  const currentStep = steps[step];

  const isLastStep = () => {
    return step === steps.length - 1;
  };

  const goNextStep = () => {
    setStep(step + 1);
  };

  const goPreviousStep = () => {
    setStep(step - 1);
  };

  const isMyTurn = () => {
    const roleTurn = state.turn.role;
    const teamTurn = state.turn.team;

    if (state.user.role === roleTurn && state.user.color === teamTurn) {
      return true;
    }
    return false;
  };

  const setClue = (clue: Clue) => {
    if (!clue) return;
    if (!currentStep) return;
    if (currentStep.expectedAction?.type !== "giveClue") return;
    if (
      !currentStep.expectedAction.payload.word
        .map((word) => word.toUpperCase())
        .includes(clue.word.toUpperCase())
    )
      return;
    if (!isMyTurn()) return;
    // Comprueba que la pista no contenga ninguna carta del tablero
    const incluyeCartaDelTablero = state.cards.some((card: Card) =>
      clue.word
        .replace(/\s+/g, "")
        .toUpperCase()
        .includes(card.word.toUpperCase()),
    );

    if (incluyeCartaDelTablero) {
      alert("La pista no puede coincidir con ninguna carta del tablero");
      return;
    }

    dispatch({
      type: "SET_CLUE",
      word: clue.word,
      cards: clue.cards,
    });
    // quitar las cartas isSelected
    const selectedCards = state.cards.filter((card: Card) => card.isSelected);
    for (const card of selectedCards) {
      dispatch({
        type: "SELECT_CARD",
        cardText: card.word,
      });
    }
    dispatch({
      type: "NEXT_TURN",
    });
    dispatch({
      type: "SET_USER",
      user: {
        ...state.user,
        role: state.turn.role === "leader" ? "agent" : "leader",
      },
    });
    goNextStep();
  };

  const revealCard = (cardText: string) => {
    if (!currentStep) return;
    if (currentStep.expectedAction?.type !== "flipCard") return;
    if (!isMyTurn()) return;
    if (
      !currentStep.expectedAction.payload.words
        .map((word) => word.toUpperCase())
        .includes(cardText.toUpperCase())
    )
      return;
    const card = state.cards.find(
      (card: Card) => card.word.toUpperCase() === cardText.toUpperCase(),
    );
    if (!card) return;

    dispatch({
      type: "REVEAL_CARD",
      cardText,
    });
    if (
      currentStep.expectedAction?.payload.words.length ===
      state.cards.filter((card: Card) => card.isFlipped).length + 1
    ) {
      goNextStep();
    }
  };

  const selectCard = (cardText: string) => {
    if (!currentStep) return;
    if (currentStep.expectedAction?.type !== "selectCard") return;
    if (!currentStep.expectedAction.payload.words.includes(cardText)) return;
    if (!isMyTurn()) return;
    const card = state.cards.find((card: Card) => card.word === cardText);
    if (card?.isSelected) return;
    if (!card || card.color !== state.turn.team || card.isFlipped) return;

    dispatch({
      type: "SELECT_CARD",
      cardText,
    });
    if (
      currentStep.expectedAction?.payload.words.length ===
      state.cards.filter((card: Card) => card.isSelected).length + 1
    ) {
      goNextStep();
    }
  };

  const nextTurn = () => {
    if (!currentStep) return;
    if (currentStep.expectedAction?.type !== "nextTurn") return;
    if (!isMyTurn()) return;
    dispatch({
      type: "NEXT_TURN",
    });
    state.clue = null;
    goNextStep();
  };

  const leaveGame = () => {
    if (state.mode === "online") {
    }
  };

  const setInitialState = () => {
    setStep(0);
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
    isLastStep,
    currentStep,
    goNextStep,
    goPreviousStep,
    setClue,
    revealCard,
    selectCard,
    nextTurn,
    leaveGame,
    isMyTurn,
    setInitialState,
  };
};
