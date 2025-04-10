import homePhoto from "@/assets/homePhoto.png";
import Button from "@/components/Button";
import SettingsIcon from "@/components/Icons/IconSettings";
import Name from "@/components/Name";
import Popup from "@/components/Popup";
import Settings from "@/components/Settings";
import { useState } from "react";

//import { useNavigate } from "react-router";

function Home() {
  //const navigate = useNavigate(); //para navegar entre rutas

  // Función para unirse a una mesa

  // Función para abrir o cerrar la configuración
  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => {
    setShowSettings(!showSettings);
  };

  const [showName, setShowName] = useState(false);
  const [showNameCode, setShowNameCode] = useState(false);

  const openName = () => {
    setShowName(!showName);
  };

  const openNameCode = () => {
    setShowName(!showName);
    setShowNameCode(!showNameCode);
  };

  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className="bg-fondo min-h-screen flex flex-col items-center justify-center">
      <img src={homePhoto} alt="not found" className="w-120 h-120" />
      {/* Botones de debajo de la foto */}
      <div className="flex items-center gap-6 mt-10">
        <Button onClick={openName}>CREAR MESA</Button>
        <Button onClick={openSettings} circular>
          <SettingsIcon stroke="fondo" />
        </Button>
        <Button onClick={openNameCode}>UNIRSE A MESA</Button>
      </div>

      <div className="absolute top-3 right-3">
        <Button onClick={openPopup}>TUTORIAL</Button>
      </div>
      {showSettings && <Settings onClose={openSettings} />}
      {showName && <Name onClose={openName} />}
      {showName && showNameCode && <Name onClose={openNameCode} unirse />}

      <Popup
        isOpen={isPopupOpen}
        onClose={openPopup}
        message="El equipo Azul ha elegido la carta negra 😓 ¡Gana la partida el equipo rojo! 🔴 🎉"
      />
    </div>
  );
}

export default Home;
