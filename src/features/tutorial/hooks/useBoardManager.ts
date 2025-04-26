import type { Board, Card } from "@/types";
import { useState } from "react";

export function useBoardManager() {
  const [board, setBoard] = useState<Board>({ cards: [] });

  /**
   * Añade la carta al board
   * @param card - Carta a añadir
   */
  const addCard = (card: Card) => {
    setBoard((prev) => ({
      ...prev,
      cards: [...prev.cards, card],
    }));
  };

  /**
   * Añade la lista de cartas al board
   * @param newCards: lista de cartas a añadir
   */
  const addCards = (newCards: Card[]) => {
    setBoard((prev) => ({
      ...prev,
      cards: [...prev.cards, ...newCards],
    }));
  };

  /**
   * Pone el atributo isFlipped de la carta a true.
   * @param cardWord: palabra de la carta que quieras levantar
   */
  const showCard = (cardWord: Card["word"]) => {
    setBoard((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.word === cardWord ? { ...card, isFlipped: true } : card,
      ),
    }));
  };

  /**
   * Pone el atributo isSelected de la carta a true.
   * @param cardWord - Carta sobre la que se hace click
   */
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
