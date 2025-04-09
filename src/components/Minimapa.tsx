import type { minimap } from "@/types/minimap";
const Minimapa = ({ values }: { values: minimap }) => {
  // const minimapa: minimap = {
  //   minimap: [
  //     [{ color: "red" }, { color: "blue" }, { color: "black" }],
  //     [{ color: "empty" }, { color: "red" }, { color: "blue" }],
  //     [{ color: "black" }, { color: "empty" }, { color: "red" }],
  //   ],
  // };

  return (
    <div className="minimapa w-[20vw]">
      <div className="minimapa__container grid w-full h-full">
        {values.minimap.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex w-full h-full">
            {row.map((cell, colIndex) => (
              <div
                className={`minimapa__cell__${cell.color} w-full h-full min-w-10 min-h-10 aspect-video border-2`}
                key={`cell-${rowIndex}-${colIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Minimapa;
