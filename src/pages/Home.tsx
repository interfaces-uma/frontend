import homePhoto from "@assets/homePhoto.png";
import Button from "@components/Button";
import SettingsIcon from "@components/Icons/IconSettings";
import Settings from "@components/Settings";
import { useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate(); //para navegar entre rutas

  // Función para unirse a una mesa
  const unirseMesa = () => {
    console.log("Unirse a mesa clicked");
  };

  // Función para crear una nueva mesa
  const crearMesa = () => {
    console.log("Crear a mesa clicked");
    navigate("/lobby");
  };

  // Función para abrir o cerrar la configuración
  const [showSettings, setShowSettings] = useState(false);

  const openSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="bg-fondo min-h-screen">
      <img src={homePhoto} alt="not found" className="w-120 h-120" />
      <Button onClick={crearMesa}>CREAR MESA</Button>
      <Button onClick={openSettings} circular>
        <SettingsIcon stroke="fondo" />
      </Button>
      <Button onClick={unirseMesa}>UNIRSE A MESA</Button>
      <Button onClick={unirseMesa}>TUTORIAL</Button>
      {showSettings && <Settings onClose={openSettings} />}
    </div>
  );
}

export default Home;
