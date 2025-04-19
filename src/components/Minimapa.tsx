import type { Card } from "@/types";
const Minimapa = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="minimapa w-[20vw]">
      <div className="minimapa__container grid grid-cols-5 gap-1 w-full h-full">
        {cards.map((card, index) => (
          <div
            className={`minimapa__cell__${card.color} w-full aspect-video border-2`}
            key={`cell-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Minimapa;
