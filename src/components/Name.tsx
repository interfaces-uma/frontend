//import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../useLocalStorage";
import Button from "./Button";
import BackIcon from "./Icons/IconBack";

function Name({
  onClose,
}: {
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [name, setName] = useLocalStorage("name", "");
  const crearMesa = () => {
    navigate("/lobby", { state: { name } });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cartas w-full max-w-md h-auto max-h-[90vh] rounded-lg flex flex-col justify-between p-6">
        <div className="self-start">
          <Button onClick={onClose} inversed circular>
            <BackIcon />
          </Button>
        </div>
        <label className="text-fondo text-2xl font-bold mb-4 mt-4">
          Nombre
          <textarea
            className="bg-transparent border-b-2 border-fondo text-fondo text-2xl font-bold mb-4 focus:outline-none"
            placeholder="Escribe tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)} // Se actualiza el nombre en el state
          />
        </label>
        <div className="flex flex-col items-center justify-center h-full">
          <Button onClick={crearMesa} inversed>
            CREAR
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Name;
