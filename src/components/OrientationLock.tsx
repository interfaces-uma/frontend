import { useEffect, useState } from "react";

function OrientationLock() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Error al intentar pantalla completa:", err);
      });
    }
    setShowFullscreenPrompt(false);
  };

  useEffect(() => {
    const checkOrientation = () => {
      const { innerWidth, innerHeight } = window;
      const value = innerWidth < innerHeight;
      setIsPortrait(value);
      if (value) {
        handleFullscreenPrompt();
      } else {
        setShowFullscreenPrompt(true);
      }
    };

    const handleFullscreenPrompt = () => {
      if (document.fullscreenElement) {
        setShowFullscreenPrompt(false);
      } else {
        setShowFullscreenPrompt(true);
      }
    };

    checkOrientation(); // Comprobar al inicio

    window.addEventListener("resize", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  if (!isPortrait && showFullscreenPrompt) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black bg-opacity-80 text-white text-center p-8">
        <p className="text-2xl font-bold">
          Por favor, entre en pantalla completa
        </p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
          onClick={enterFullscreen}
        >
          Entrar en pantalla completa
        </button>
      </div>
    );
  }

  if (!isPortrait && !showFullscreenPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80 text-white text-center p-8">
      <p className="text-2xl font-bold">Por favor, gira tu dispositivo</p>
    </div>
  );
}

export default OrientationLock;
