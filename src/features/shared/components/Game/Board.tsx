import { useGameState } from "@/context/game/GameContext";
import Card from "@/features/shared/components/Game/Card";
import type { Board as BoardType, Card as CardType } from "@/types";
export default function Board({
  board,
  handleCardClick,
}: { board: BoardType; handleCardClick: (word: string) => void }) {
  // <div className="card-grid grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-3">

  const { state } = useGameState();
  let redSpriteCounter = 0;
  let blueSpriteCounter = 0;
  let greySpriteCounter = 0;

  const userRole = state.user.role;
  const userColor = state.user.color;
  const turnRole = state.turn.role;
  const turnColor = state.turn.team;

  const isYourTurn = userRole === turnRole && userColor === turnColor;

  const cardAnimationLogic = (card: CardType) => {
    if (
      isYourTurn &&
      state.user.role === "leader" &&
      card.color === state.user.color
    ) {
      return "transform hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer";
    }
    if (isYourTurn && state.user.role === "agent") {
      return "transform hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer";
    }
    return "cursor-default";
  };

  return (
    <div className="grid grid-cols-5 gap-3 flex-1">
      {board.cards.map((card) => {
        return (
          <Card
            card={card}
            cardAnimationString={cardAnimationLogic(card)}
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
