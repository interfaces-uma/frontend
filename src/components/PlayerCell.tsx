function PlayerCell({
  children,
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  let buttonStyle = "";
  if (children === "Unirse...") {
    buttonStyle = "w-50 h-10 bg-chat hover:brightness-85 text-fondo";
  } else {
    buttonStyle = "w-50 h-10 bg-chat hover:brightness-85 text-fondo";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonStyle} cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default PlayerCell;
