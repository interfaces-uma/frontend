import Card from "@/components/Card";
import type { Board as BoardType, Role } from "@/types";
export default function Board({
  board,
  role,
  handleCardClick,
}: { board: BoardType; role: Role; handleCardClick: (word: string) => void }) {
  // <div className="card-grid grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3">
  return (
    <div className="board">
      <div className="card-grid grid grid-cols-5 gap-3 w-full">
        {board.cards.map((card) => {
          return (
            <Card
              card={card}
              role={role}
              handleCardClick={handleCardClick}
              key={card.word}
            />
          );
        })}
      </div>
    </div>
  );
}
