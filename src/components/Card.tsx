import type { Card as CardType, Role } from "@/types";

export default function Card({
  card,
  role,
  handleCardClick,
}: { card: CardType; role: Role; handleCardClick: (word: string) => void }) {
  const colors: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    black: "bg-black",
    empty: "bg-yellow-500",
  };
  let className =
    "card bg-[#F0D9B9] aspect-[3/2] rounded-lg flex items-center justify-center drop-shadow-md cursor-pointer";

  if (card.isSelected) {
    className += " outline outline-4 outline-blue-300";
  }

  if (card.isFlipped) {
    className += ` ${colors[card.color]}`;
  }

  return (
    <div
      className={className}
      onClick={() => handleCardClick(card.word)}
      onKeyDown={() => handleCardClick(card.word)}
    >
      <div className="card-inner aspect-[3/2] border-2 w-[85%] h-[75%] border-black rounded-lg flex items-center justify-center inset-shadow-sm text-center">
        {card.isFlipped || role === "leader" ? (
          <span
            className={`${colors[card.color]} uppercase text-[clamp(0.75rem,2.5vw,1.5rem)]`}
          >
            {card.word}
          </span>
        ) : (
          <span className="uppercase text-[clamp(0.75rem,2.5vw,1.5rem)]">
            {card.word}
          </span>
        )}
      </div>
    </div>
  );
}
