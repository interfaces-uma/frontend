import { useVolume } from "@/context/backgroundVolume/backgroundVolumeContext";
import { cuseVolume } from "@/context/clickVolume/clickVolumeContext";
import { huseVolume } from "@/context/hoverVolume/hoverVolumeContext";
import Button from "@/features/shared/components/Button";
import { useHoverSound } from "@/features/shared/components/HoverSound";
import BackIcon from "@/features/shared/components/Icons/IconBack";
import IconFontSize from "@/features/shared/components/Icons/IconFontSize";
import IconLanguage from "@/features/shared/components/Icons/IconLanguage";
import IconVolume from "@/features/shared/components/Icons/IconVolume";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Settings({
  onClose,
  roomCode,
}: { onClose: () => void; roomCode?: string }) {
  const { t, i18n } = useTranslation();
  const fontSizes = [20, 22, 24, 26, 28];
  const { volume, setVolume } = useVolume();
  const { hvolume, hsetVolume } = huseVolume();
  const { cvolume, csetVolume } = cuseVolume();

  const [prevVolume, setPrevVolume] = useState<number | null>(null);
  const [hprevVolume, hsetPrevVolume] = useState<number | null>(null);
  const [cprevVolume, csetPrevVolume] = useState<number | null>(null);

  // Inicializar fontIndex desde localStorage o usar valor por defecto
  const [fontIndex, setFontSize] = useState(() => {
    const savedFontIndex = localStorage.getItem("fontIndex");
    return savedFontIndex ? Number(savedFontIndex) : 2; // 2 corresponde a 24px
  });

  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "es",
  );

  const { playHoverSound } = useHoverSound();

  const [copied, setCopied] = useState(false);

  const [narratorEnabled, setNarratorEnabled] = useState<boolean>(
    () => localStorage.getItem("helpSound") === "true",
  );

  // Aplicar tamaño de fuente al montar el componente
  useEffect(() => {
    const savedFont = localStorage.getItem("fontIndex");
    const savedLang = localStorage.getItem("language");

    if (savedFont) {
      const savedFontIndex = Number(savedFont);
      document.documentElement.style.setProperty(
        "--font-size",
        `${fontSizes[savedFontIndex]}px`,
      );
    }
    if (savedLang) setLanguage(savedLang);
  }, []);

  // Guardar y aplicar cambios de tamaño de fuente
  useEffect(() => {
    localStorage.setItem("fontIndex", fontIndex.toString());
    document.documentElement.style.setProperty(
      "--font-size",
      `${fontSizes[fontIndex]}px`,
    );
  }, [fontIndex]);

  // Guardar idioma y cambiar en i18next
  useEffect(() => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language]);

  // Guardar narrador
  useEffect(() => {
    localStorage.setItem("helpSound", narratorEnabled.toString());
  }, [narratorEnabled]);

  const toggleMute = () => {
    if (volume === 0 && prevVolume !== null) {
      setVolume(prevVolume);
      setPrevVolume(null);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  const toggleHoverMute = () => {
    if (hvolume === 0 && hprevVolume !== null) {
      hsetVolume(hprevVolume);
      hsetPrevVolume(null);
    } else {
      hsetPrevVolume(hvolume);
      hsetVolume(0);
    }
  };

  const toggleClickMute = () => {
    if (cvolume === 0 && cprevVolume !== null) {
      csetVolume(cprevVolume);
      csetPrevVolume(null);
    } else {
      csetPrevVolume(cvolume);
      csetVolume(0);
    }
  };

  const handleMouseEnter = (text: string) => {
    if (narratorEnabled) playHoverSound(text);
    else playHoverSound();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOverlayClick} // Agrega el evento de clic
    >
      <div className="bg-cartas w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Encabezado */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-fondo">{t("settings")}</h1>
          <Button narrator={t("close")} onClick={onClose} inversed circular>
            <BackIcon />
          </Button>
        </div>

        {/* Volumen de música */}
        <div className="space-y-2">
          <label
            htmlFor="music-volume"
            id="music-volume"
            className="flex items-center gap-2 text-fondo font-medium cursor-pointer"
          >
            <IconVolume
              onMouseEnter={() => handleMouseEnter("Mutear música")}
              volume={volume}
              onClick={toggleMute}
              className="text-fondo"
              fill="currentColor"
            />
            {t("music_volume")}
          </label>
          <input
            onMouseEnter={() =>
              handleMouseEnter(
                `volumen de la musica al ${Math.round(volume * 100)} por ciento`,
              )
            }
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-fondo"
          />
        </div>

        {/* Sonido de clic */}
        <div className="space-y-2">
          <label
            htmlFor="cmusic-volume"
            id="music-volume"
            className="flex items-center gap-2 text-fondo font-medium cursor-pointer"
          >
            <IconVolume
              onMouseEnter={() => handleMouseEnter("mutear el click")}
              volume={cvolume}
              onClick={toggleClickMute}
              className="text-fondo"
              fill="currentColor"
            />
            {t("click_volume")}
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={cvolume}
            onChange={(e) => csetVolume(Number(e.target.value))}
            onMouseEnter={() =>
              handleMouseEnter(
                `volumen del click al ${Math.round(cvolume * 100)} por ciento`,
              )
            }
            className="w-full accent-fondo"
          />
        </div>

        {/* Sonido al pasar el ratón */}
        <div className="space-y-2">
          <label
            htmlFor="hmusic-volume"
            id="music-volume"
            className="flex items-center gap-2 text-fondo font-medium cursor-pointer"
          >
            <IconVolume
              onMouseEnter={() => handleMouseEnter("mutear al pasar el ratón")}
              volume={hvolume}
              onClick={toggleHoverMute}
              className="text-fondo"
              fill="currentColor"
            />
            {t("hover_volume")}
          </label>
          <input
            onMouseEnter={() =>
              handleMouseEnter(
                `volumen al pasar el raton al ${Math.round(hvolume * 100)} por ciento`,
              )
            }
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={hvolume}
            onChange={(e) => hsetVolume(Number(e.target.value))}
            className="w-full accent-fondo"
          />
        </div>

        {/* Tamaño de texto */}
        <div className="space-y-2">
          <label
            htmlFor="font-size"
            className="flex items-center gap-2 text-fondo font-medium"
          >
            <IconFontSize
              onMouseEnter={() => handleMouseEnter(t("text_size"))}
              className="text-fondo"
              fill="currentColor"
            />
            {t("text_size")}
          </label>
          <input
            onMouseEnter={() =>
              handleMouseEnter(
                `tamaño del texto al ${Math.round(fontIndex * 100) - 100} por ciento`,
              )
            }
            type="range"
            min={0}
            max={4}
            step={1}
            value={fontIndex}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full accent-fondo"
          />
        </div>

        {/* Idioma */}
        <div className="space-y-2">
          <label
            htmlFor="languaje"
            className="flex items-center gap-2 text-fondo font-medium"
          >
            <IconLanguage
              onMouseEnter={() => handleMouseEnter(t("language"))}
              className="text-fondo"
              fill="currentColor"
            />
            {t("language")}
          </label>
          <select
            onMouseEnter={() => handleMouseEnter(language)}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-cartas text-fondo font-semibold px-4 py-2 rounded-lg"
          >
            <option value="es">🇪 Español</option>
            <option value="en">🇬 English</option>
            <option value="fr">🇫 Français</option>
            <option value="de">🇩 Deutsch</option>
            <option value="zh">普通话</option>
          </select>
        </div>

        {/* Código de sala */}
        {roomCode && (
          <div className="text-fondo space-y-1">
            <button
              onMouseEnter={() => handleMouseEnter("copiar codigo de sala")}
              type="button"
              onClick={handleCopy}
              className="text-lg font-bold underline hover:text-yellow-300"
            >
              {t("room_code")} {roomCode}
            </button>
            {copied && <p className="text-sm opacity-60">¡Código copiado!</p>}
          </div>
        )}

        {/* Ayuda de sonido*/}
        <div className="flex items-center justify-between text-fondo font-medium pt-2 border-t border-fondo/20">
          <span>{t("sound_help")}</span>
          <input
            onMouseEnter={() => handleMouseEnter("ayuda de sonido")}
            type="checkbox"
            checked={narratorEnabled}
            onChange={() => setNarratorEnabled(!narratorEnabled)}
            className="w-6 h-6 accent-fondo"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
