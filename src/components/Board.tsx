import Card from "@/components/Card";
import type { Board as BoardType } from "@/types/game";
export default function Board({
  board,
  handleCardClick,
}: { board: BoardType; handleCardClick: (word: string) => void }) {
  return (
    <div className="board">
      <div className="card-grid grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 ">
        {board.cards.map((card) => {
          return (
            <Card
              card={card}
              handleCardClick={handleCardClick}
              key={card.word}
            />
          );
        })}
      </div>
    </div>
  );
}
