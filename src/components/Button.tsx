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
    buttonStyle = "w-75 h-25 bg-fondoAzul hover:brightness-85 text-fondo";
  } else if (children === "UNIRSE A MESA") {
    buttonStyle = "w-75 h-25 bg-fondoRojo hover:brightness-85 text-fondo";
  } else if (children === "CREAR") {
    buttonStyle =
      "w-50 h-15 bg-chat hover:brightness-85 text-fondo justify-center";
  } else {
    buttonStyle = "bg-cartas hover:bg-yellow-100";
  }

  if (inversed) {
    buttonStyle = "bg-fondo hover:brightness-85 text-cartas";
  }

  if (circular) {
    buttonCircle = "px-3 py-3 rounded-full";
  } else {
    buttonCircle = "w-36 h-12 rounded-xl";
  }

  if (inversed) {
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonCircle} ${buttonStyle} transition duration-300 ease-in-out cursor-pointer`}
    >
      {children}
    </button>
  );
}

export default Button;
