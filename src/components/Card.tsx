import type { Card as CardType } from "@/types/game";

export default function Card({
  card,
  handleCardClick,
}: { card: CardType; handleCardClick: (word: string) => void }) {
  const colors: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    black: "bg-black",
    empty: "bg-yellow-500",
  };

  let className =
    "card rounded-lg p-4 m-2 text-white text-center cursor-pointer";

  if (card.isSelected) {
    className += " outline outline-4 outline-blue-300";
  }

  if (card.isFlipped) {
    className += ` ${colors[card.color]}`;
  } else {
    className += " bg-gray-400";
  }

  return (
    <div
      onClick={() => handleCardClick(card.word)}
      onKeyDown={() => handleCardClick(card.word)}
    >
      <div className={className}>
        {card.isFlipped ? (
          <span className={colors[card.color]}>{card.word}</span>
        ) : (
          <span>{card.word}</span>
        )}
      </div>
    </div>
  );
}
