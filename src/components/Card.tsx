import backSprite from "@/assets/backs.png";
import blackCard from "@/assets/black-back.png";
import blueAgents from "@/assets/blueAgents.png";
import greyAgents from "@/assets/greyAgents.png";
import redAgents from "@/assets/redAgents.png";
import { useGameState } from "@/context/game/GameContext";
import type { Card as CardType } from "@/types";

export default function Card({
  card,
  iconIndex,
  handleCardClick,
  cardAnimationString,
}: {
  card: CardType;
  iconIndex: number;
  handleCardClick: (word: string) => void;
  cardAnimationString: string;
}) {
  const { state } = useGameState();
  const colors: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    black: "bg-black",
    empty: "bg-card",
  };
  let className =
    "card bg-[#F0D9B9] rounded-lg flex items-center justify-center drop-shadow-md";

  if (card.isSelected) {
    className += " outline outline-4 outline-yellow-300";
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
  const spriteOffset = iconIndex;

  const colorBackgrounds = {
    backgroundSize: "100% 910%",
    backgroundPosition: `0 ${(spriteOffset % 9) * 12.5}%`,
  };

  const greyBackgrounds = {
    backgroundSize: "100% 610%",
    backgroundPosition: `0 ${(spriteOffset % 6) * 20}%`,
  };

  const coloredCardHtml = (
    <div>
      <div className="absolute z-10 left-1/2 transform -translate-x-[50%] bottom-0 w-full h-full">
        <div
          id="agent"
          className="m-auto w-[70%] h-[100%] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${card.color === "red" ? redAgents : card.color === "blue" ? blueAgents : card.color === "empty" ? greyAgents : ""})`,
            backgroundRepeat: "no-repeat",
            ...(card.color === "red" || card.color === "blue"
              ? colorBackgrounds
              : card.color === "empty"
                ? greyBackgrounds
                : {}),
          }}
        />
      </div>
      <div
        className={`${className} w-full h-full absolute z-9`}
        style={{
          backgroundImage: `url(${backSprite})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 410%",
          backgroundPosition: `0 ${backSpriteIndex * 33.33}%`,
        }}
      />
    </div>
  );

  const assassinCardHtml = (
    <div
      className={className}
      style={{
        backgroundImage: `url(${blackCard})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    />
  );

  return card.isFlipped ? (
    <div className="relative w-full h-full">
      {card.color === "black" ? assassinCardHtml : coloredCardHtml}
    </div>
  ) : (
    <div
      className={`${className} ${cardAnimationString}`}
      onClick={() => handleCardClick(card.word)}
    >
      <div className="card-inner border-2 w-[85%] h-[75%] border-black rounded-lg flex items-center justify-center inset-shadow-sm text-center">
        <span className="uppercase text-[clamp(0.75rem,2.5vw,1.5rem)] text-nowrap select-none">
          {card.word}
        </span>
      </div>
    </div>
  );
}
