function Player_Cell({
  children,
}: {
  children?: React.ReactNode;
}) {
  let buttonStyle = "";
  if (children === "Unirse...") {
    buttonStyle = "w-50 h-10 bg-chat hover:brightness-85 text-fondo";
  } else {
    buttonStyle = "w-50 h-10 bg-chat hover:brightness-85 text-fondo";
  }

  return (
    <button type="button" className={buttonStyle}>
      {children}
    </button>
  );
}

export default Player_Cell;
