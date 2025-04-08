function Button({
  children,
  onClick,
  circular,
}: { children?: React.ReactNode; onClick: () => void; circular?: boolean }) {
  let buttonStyle = "";
  let buttonCircle = "";
  if (children === "CREAR MESA") {
    buttonStyle = "bg-blue-500 hover:bg-blue-700";
  } else if (children === "UNIRSE A MESA") {
    buttonStyle = "bg-red-500 hover:bg-red-700";
  } else {
    buttonStyle = "bg-yellow-100 hover:bg-yellow-200";
  }

  if (circular) {
    buttonCircle = "px-10 py-10 rounded-full";
  } else {
    buttonCircle = "px-18 py-6 rounded";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonCircle} ${buttonStyle} text-fondo  transition duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
}

export default Button;
