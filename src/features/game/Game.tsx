import Board from "@/components/Board";
import type { Card } from "@/types/game";
import { useEffect } from "react";
import { useBoardManager } from "./hooks/useBoardManager";
export default function Game() {
  const { board, handleCardClick, addCards } = useBoardManager();

  const cards: Card[] = [
    { word: "apple", color: "red", isSelected: false, isFlipped: false },
    { word: "banana", color: "blue", isSelected: false, isFlipped: false },
    { word: "cherry", color: "black", isSelected: false, isFlipped: false },
    { word: "date", color: "empty", isSelected: false, isFlipped: false },
    { word: "fig", color: "red", isSelected: false, isFlipped: false },
    { word: "grape", color: "blue", isSelected: false, isFlipped: false },
    { word: "kiwi", color: "black", isSelected: false, isFlipped: false },
    { word: "lemon", color: "empty", isSelected: false, isFlipped: false },
    { word: "mango", color: "red", isSelected: false, isFlipped: false },
    { word: "nectarine", color: "blue", isSelected: false, isFlipped: false },
    { word: "orange", color: "black", isSelected: false, isFlipped: false },
    { word: "papaya", color: "empty", isSelected: false, isFlipped: false },
    { word: "quince", color: "red", isSelected: false, isFlipped: false },
    { word: "raspberry", color: "blue", isSelected: false, isFlipped: false },
    { word: "strawberry", color: "black", isSelected: false, isFlipped: false },
    { word: "tangerine", color: "empty", isSelected: false, isFlipped: false },
    { word: "ugli fruit", color: "red", isSelected: false, isFlipped: false },
    {
      word: "vanilla bean",
      color: "blue",
      isSelected: false,
      isFlipped: false,
    },
    { word: "watermelon", color: "black", isSelected: false, isFlipped: false },
    { word: "xigua", color: "empty", isSelected: false, isFlipped: false },
    {
      word: "yellow passion fruit",
      color: "red",
      isSelected: false,
      isFlipped: false,
    },
    { word: "zucchini", color: "blue", isSelected: false, isFlipped: false },
    { word: "apricot", color: "black", isSelected: false, isFlipped: false },
    { word: "blueberry", color: "empty", isSelected: false, isFlipped: false },
    { word: "fiaaag", color: "empty", isSelected: false, isFlipped: false },
  ];
  useEffect(() => {
    addCards(cards);
  }, []);
  return (
    <div className="flex w-max h-[100%]">
      <div className="board-section w-[70%]">
        <Board board={board} handleCardClick={handleCardClick} />
      </div>
    </div>
  );
}
