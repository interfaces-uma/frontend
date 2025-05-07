import Card from "@/components/Card";
import type { Board as BoardType } from "@/types";
export default function Board({
  board,
  handleCardClick,
}: { board: BoardType; handleCardClick: (word: string) => void }) {
  // <div className="card-grid grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3">

  let redSpriteCounter = 0;
  let blueSpriteCounter = 0;
  let greySpriteCounter = 0;

  return (
    <div className="grid grid-cols-5 gap-3 flex-1">
      {board.cards.map((card) => {
        return (
          <Card
            card={card}
            iconIndex={
              card.color === "red"
                ? redSpriteCounter++
                : card.color === "blue"
                  ? blueSpriteCounter++
                  : greySpriteCounter++
            }
            handleCardClick={handleCardClick}
            key={card.word}
          />
        );
      })}
    </div>
  );
}
