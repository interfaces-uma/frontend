function Button({
  children,
  onClick,
  circular,
  inversed,
}: {
  children?: React.ReactNode;
  onClick: () => void;
  circular?: boolean;
  inversed?: boolean;
}) {
  let buttonStyle = "";
  let buttonCircle = "";
  if (children === "CREAR MESA") {
    buttonStyle = "w-60 h-20 bg-fondoAzul hover:brightness-85 text-fondo";
  } else if (children === "UNIRSE A MESA") {
    buttonStyle = "w-60 h-20 bg-fondoRojo hover:brightness-85 text-fondo";
  } else {
    buttonStyle = "bg-cartas hover:bg-yellow-100";
  }

  if (inversed) {
    buttonStyle = "bg-fondo hover:brightness-85 text-cartas";
  }

  if (circular) {
    buttonCircle = "px-2 py-2 rounded-full";
  } else {
    buttonCircle = "px-10 py-5 rounded";
  }

  if (inversed) {
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonCircle} ${buttonStyle} transition duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
}

export default Button;
