import homePhoto from "@/assets/homePhoto.png";
import Button from "@/components/Button";
import SettingsIcon from "@/components/Icons/IconSettings";
import Name from "@/components/Name";
import Popup from "@/components/Popup";
import Settings from "@/components/Settings";
import { useState } from "react";
import BackgroundMusic from "@/components/BackgroundMusic";

function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showNameCode, setShowNameCode] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openSettings = () => setShowSettings(!showSettings);
  const openName = () => setShowName(!showName);
  const openNameCode = () => {
    setShowName(!showName);
    setShowNameCode(!showNameCode);
  };
  const openPopup = () => setPopupOpen(!isPopupOpen);

  return (
    <div className="bg-fondo min-h-screen flex flex-col items-center justify-center">
      <img src={homePhoto} alt="not found" className="w-120 h-120" />

      {/* Botones debajo de la foto */}
      <div className="flex items-center gap-6 mt-10">
        <Button onClick={openName}>CREAR MESA</Button>
        <Button onClick={openSettings} circular>
          <SettingsIcon stroke="fondo" />
        </Button>
        <Button onClick={openNameCode}>UNIRSE A MESA</Button>
      </div>

      {/* Botón tutorial */}
      <div className="absolute top-3 right-3">
        <Button onClick={openPopup}>TUTORIAL</Button>
      </div>

      {/* Música de fondo */}
      <BackgroundMusic />

      {showSettings && <Settings onClose={openSettings} />}
      {showName && !showNameCode && <Name onClose={openName} />}
      {showNameCode && <Name onClose={openNameCode} unirse />}
      <Popup
        isOpen={isPopupOpen}
        onClose={openPopup}
        message="TUTORIAL EN CONSTRUCCIÓN 🏗️🚧🚧👷👷👷"
      />
    </div>
  );
}

export default Home;
