import { useEffect, useState } from "react";
import Button from "./Button";
import BackIcon from "./Icons/IconBack";
import IconFontSize from "./Icons/IconFontSize";
import IconLanguage from "./Icons/IconLanguage";
import IconVolume from "./Icons/IconVolume";

function Settings({
  onClose,
}: {
  onClose: () => void;
}) {
  const [volume, setVolume] = useState(50);
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };
  const [prevVolume, setPrevVolume] = useState<number | null>(null);

  const muteVolume = () => {
    if (volume === 0 && prevVolume !== null) {
      setVolume(prevVolume);
      setPrevVolume(null);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  const fontSizes = [16, 18, 20, 22, 24];
  const [fontIndex, setFontSize] = useState(2);

  useEffect(() => {
    document.body.style.fontSize = `${fontSizes[fontIndex]}px`;
  }, [fontIndex]);

  /*
   *   Queda poner los iconos de los colores del fondo
   *   Que el volumen realmente funcione
   *   Terminar de añadir las cosas de los ajustes
   *   A lo mejor se pueda crear una componente que sea elemento de ajustes para reultilizarla
   */

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-cartas w-full max-w-md h-auto max-h-[90vh] rounded-lg flex flex-col justify-between p-6">
        <div className="self-start">
          <Button onClick={onClose} inversed circular>
            <BackIcon />
          </Button>
        </div>

        <div className="w-full flex justify-between items-center gap-2 mt-10">
          <label htmlFor="volume">
            <IconVolume volume={volume} onClick={muteVolume} fill="fondo" />
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolume}
            className="w-2/3 accent-fondo"
          />
        </div>
        <div className="w-full flex justify-between items-center gap-2 mt-10">
          <IconFontSize fill="fondo" />
          <input
            id="volume"
            type="range"
            min={0}
            max={4}
            step={1}
            value={fontIndex}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-2/3 accent-fondo"
          />
        </div>

        <div className="w-full flex justify-between items-center gap-2 mt-10">
          <IconLanguage fill="fondo" />
          {/* para el cambio de idioma se hace con i18next*/}

          <select className="w-2/3 accent-fondo bg-center " defaultValue="es">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutch</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;
