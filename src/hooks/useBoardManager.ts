import type { Board, Card } from "@/types/game";
import { useState } from "react";

export function useBoardManager() {
  const [board, setBoard] = useState<Board>({ cards: [] });

  const addCard = (card: Card) => {
    setBoard((prev) => ({
      ...prev,
      cards: [...prev.cards, card],
    }));
  };

  const addCards = (newCards: Card[]) => {
    setBoard((prev) => ({
      ...prev,
      cards: [...prev.cards, ...newCards],
    }));
  };

  const showCard = (cardWord: Card["word"]) => {
    setBoard((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.word === cardWord ? { ...card, isFlipped: true } : card,
      ),
    }));
  };

  const handleCardClick = (cardWord: Card["word"]) => {
    setBoard((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.word === cardWord
          ? { ...card, isSelected: !card.isSelected }
          : card,
      ),
    }));
  };

  return {
    board,
    addCard,
    addCards,
    showCard,
    handleCardClick,
  };
}
