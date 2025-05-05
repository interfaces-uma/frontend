import homePhoto from "@/assets/homePhoto.webp";
import BackgroundMusic from "@/components/BackgroundMusic";
import Button from "@/components/Button";
import SettingsIcon from "@/components/Icons/IconSettings";
import Name from "@/components/Name";
import Popup from "@/components/Popup";
import Settings from "@/components/Settings";
import { useState } from "react";

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
    <>
      {/* Vista movil */}
      <div className="w-full h-full bg-fondo overflow-hidden md:hidden">
        <div className="flex flex-col mx-[15%] justify-center items-center h-full">
          <h1 className="text-center text-[clamp(3rem,5.5vw,100.5rem)]/12 w-full text-white mt-10">
            CÓDIGO SECRETO
          </h1>
          <img
            src={homePhoto}
            alt="home"
            className="aspect-square w-full mt-5 lg:w-[30%]"
          />
          <div id="botones" className="h-[25%] w-full mt-5 flex flex-col">
            <Button onClick={openName} style="w-full h-[30%] m-auto">
              CREAR MESA
            </Button>
            <Button onClick={openNameCode} style="w-full h-[30%] m-auto">
              UNIRSE A MESA
            </Button>
            <Button
              onClick={openPopup}
              style="w-full h-[30%] m-auto"
              narrator="TUTORIAL"
            >
              COMO JUGAR
            </Button>
          </div>
          <div
            id="opciones"
            className="flex justify-center items-center gap-4 mt-5 mb-5 w-full"
          >
            <Button
              narrator="Ajustes"
              onClick={openSettings}
              circular
              style="w-13 h-13 flex items-center justify-center"
            >
              <SettingsIcon stroke="fondo" />
            </Button>
            <BackgroundMusic />
          </div>
        </div>
        {showSettings && <Settings onClose={openSettings} />}
        {showName && !showNameCode && <Name onClose={openName} />}
        {showNameCode && <Name onClose={openNameCode} unirse />}
        <Popup
          isOpen={isPopupOpen}
          onClose={openPopup}
          message="TUTORIAL EN CONSTRUCCIÓN 🏗🚧🚧👷👷👷"
        />
        <Popup autoWelcome />
      </div>

      {/* Vista pc */}
      <div className="bg-fondo h-screen w-screen flex-col items-center justify-center hidden md:flex">
        <h1 className="text-center text-[clamp(3rem,5.5vw,100.5rem)]/12 w-full text-white">
          CÓDIGO SECRETO
        </h1>
        <img src={homePhoto} alt="not found" className="mt-10 w-[25%]" />

        <div className="flex items-center gap-6 mt-10">
          <Button onClick={openName}>CREAR MESA</Button>
          <Button narrator="Ajustes" onClick={openSettings} circular>
            <SettingsIcon stroke="fondo" />
          </Button>
          <Button onClick={openNameCode}>UNIRSE A MESA</Button>
        </div>

        <div className="absolute top-3 right-3">
          <Button onClick={openPopup} narrator="COMO JUGAR">
            COMO JUGAR
          </Button>
        </div>

        <div className="absolute left-5 bottom-5">
          <BackgroundMusic showText={true} />
        </div>

        {showSettings && <Settings onClose={openSettings} />}
        {showName && !showNameCode && <Name onClose={openName} />}
        {showNameCode && <Name onClose={openNameCode} unirse />}

        {/* Tutorial popup manual */}
        <Popup
          isOpen={isPopupOpen}
          onClose={openPopup}
          message="TUTORIAL EN CONSTRUCCIÓN 🏗🚧🚧👷👷👷"
        />

        {/* Auto-popup de bienvenida + explicación */}
        <Popup autoWelcome />
      </div>
    </>
  );
}

export default Home;
