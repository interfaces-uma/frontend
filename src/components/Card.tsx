import { useGameState } from "@/context/game/GameContext";
import type { Card as CardType } from "@/types";
import backSprite from "@/assets/backs.png";
import redAgents from "@/assets/redAgents.png";
import blueAgents from "@/assets/blueAgents.png";

export default function Card({
  card,
  handleCardClick,
}: { card: CardType; handleCardClick: (word: string) => void }) {
  const { state } = useGameState();
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

  if (state.user.role === "leader") {
    className += ` ${colors[card.color]}`;
    if (card.color === "black") {
      className += " text-white";
    }
  }

  if (card.isFlipped) {
    className += ` ${colors[card.color]}`;
    if (card.color === "black") {
      className += " text-white";
    }
  }

  const backSpriteIndex = {
    blue: 0,
    empty: 1,
    black: 2,
    red: 3,
  }[card.color];

  // numero aleatorio entre 0 y 9
  const randomNumber = Math.floor(Math.random() * 10);

  return card.isFlipped ? (
    <div className="relative w-full h-full">
      <div className="absolute z-10 left-1/2 transform -translate-x-[50%] bottom-0 w-full h-full">
        <div
          id="agent"
          className="m-auto w-[70%] h-[100%] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${card.color === "red" ? redAgents : blueAgents})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 910%",
            backgroundPosition: `0 ${randomNumber * 12.5}%`,
          }}
        />
      </div>
      <div
        className={className}
        style={{
          backgroundImage: `url(${backSprite})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 410%",
          backgroundPosition: `0 ${backSpriteIndex * 33.33}%`,
        }}
      />
    </div>
  ) : (
    <div
      className={className}
      onClick={() => handleCardClick(card.word)}
      onKeyDown={() => handleCardClick(card.word)}
    >
      <div className="card-inner aspect-[3/2] border-2 w-[85%] h-[75%] border-black rounded-lg flex items-center justify-center inset-shadow-sm text-center">
        <span className="uppercase text-[clamp(0.75rem,2.5vw,1.5rem)]">
          {card.word}
        </span>
      </div>
    </div>
  );
}
