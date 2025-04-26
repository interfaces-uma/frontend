import Board from "@/components/Board";
import type { Card } from "@/types";
import { useEffect } from "react";
import { useBoardManager } from "./hooks/useBoardManager";
import { socket } from "./service/socket";
import { useOnlineManager } from "./hooks/useOnlineManager";
export default function Game() {
  const { board, handleCardClick, addCards } = useBoardManager();
  const { state, dispatch } = useOnlineManager();

  const pruebaBack = (cardWord: string) => {
    const card: Card = {
      word: cardWord,
      color: "red",
      isFlipped: false,
      isSelected: false,
    };
    console.log(cardWord);
    socket.emit("guessCard", card);
  };

  const cards = { cards: state.cards };

  return (
    <div className="flex w-max h-[100%]">
      <div className="board-section w-[70%]">
        <Board board={cards} handleCardClick={pruebaBack} />
      </div>
    </div>
  );
}
