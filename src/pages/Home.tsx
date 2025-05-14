import homePhoto from "@/assets/homePhoto.webp";
import Name from "@/features/lobby/components/Name";
import Settings from "@/features/settings/components/Settings";
import BackgroundMusic from "@/features/shared/components/BackgroundMusic";
import Button from "@/features/shared/components/Button";
import SettingsIcon from "@/features/shared/components/Icons/IconSettings";
import Popup from "@/features/shared/components/Popup";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showNameCode, setShowNameCode] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
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
          <h1 className="text-center font-fuente1 font-bold text-[clamp(3rem,5.5vw,100.5rem)]/12 text-white drop-shadow-[8px_8px_10px_rgba(0,0,0,1)]">
            EL CÓDIGO CLANDESTINO
          </h1>
          <img
            src={homePhoto}
            alt="home"
            className="aspect-square w-full mt-5 lg:w-[30%]"
          />
          <div id="botones" className="h-[25%] w-full mt-5 flex flex-col">
            <Button onClick={openName} style="w-full h-[30%] m-auto">
              {t("create_game")}
            </Button>
            <Button onClick={openNameCode} style="w-full h-[30%] m-auto">
              {t("join_game")}
            </Button>
            <Button
              onClick={openPopup}
              style="w-full h-[30%] m-auto"
              narrator="TUTORIAL"
            >
              {t("how_to_play")}
            </Button>
          </div>
          <div
            id="opciones"
            className="flex justify-center items-center gap-4 mt-5 mb-5 w-full"
          >
            <Button
              narrator={t("settings")}
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
          message="APRENDE A JUGAR"
        >
          <Button
            onClick={() => navigate("/tutorial")}
            style="w-full bg-fondo text-white rounded-lg"
          >
            {t("tutorial")}
          </Button>
        </Popup>
      </div>

      {/* Vista pc */}
      <div className="bg-fondo h-screen w-screen flex-col items-center justify-center hidden md:flex">
        <h1 className="text-center font-fuente1 font-bold text-[clamp(3rem,5.5vw,100.5rem)]/12 text-white drop-shadow-[8px_8px_10px_rgba(0,0,0,1)]">
          EL CÓDIGO CLANDESTINO
        </h1>
        <img src={homePhoto} alt="not found" className="mt-20 w-[25%]" />

        <div className="flex items-center gap-6 mt-10">
          <Button onClick={openName}>{t("create_game")}</Button>
          <Button narrator="Ajustes" onClick={openSettings} circular>
            <SettingsIcon stroke="fondo" />
          </Button>
          <Button onClick={openNameCode}>{t("join_game")}</Button>
        </div>

        <div className="absolute top-3 right-3">
          <Button onClick={openPopup} narrator={t("how_to_play")} circular>
            {t("how_to_play")}
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
          message="APRENDE A JUGAR"
        >
          <Button
            onClick={() => navigate("/tutorial")}
            style="w-full bg-fondo text-white rounded-lg"
          >
            {t("tutorial")}
          </Button>
        </Popup>

        {/* Auto-popup de bienvenida + explicación */}
      </div>
      <Popup autoWelcome />
    </>
  );
}

export default Home;
