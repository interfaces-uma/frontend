import { useGameState } from "@/context/game/GameContext";

function PlayerCell({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  let buttonStyle = "";
  if (children === "Unirse...") {
    buttonStyle = "bg-chat hover:brightness-85 text-fondo";
  } else {
    buttonStyle = "bg-cartas hover:brightness-85 text-fondo";
  }

  const { state } = useGameState();

  return (
    <button
      type="button"
      disabled={state.isGameStarted}
      onClick={onClick}
      className={`${buttonStyle} cursor-pointer rounded-md w-[100%] aspect-7/1 max-h-10 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

export default PlayerCell;
