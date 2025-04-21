import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { useVolume } from "@/context/Volume/VolumeContext";

import music1 from "@/assets/homemusic.mp3";
import music2 from "@/assets/lobbymusic.mp3";
import music3 from "@/assets/2TheSky.mp3";
import music4 from "@/assets/RapdeFernanfloo.mp3";

const musicList = [
  { name: "Música Menú", src: music1 },
  { name: "Música de acción", src: music2 },
  { name: "2 The Sky", src: music3 },
  { name: "Rap de Fernanfloo", src: music4 },
];

const MUSIC_STORAGE_KEY = "selectedMusic";

const BackgroundMusic = () => {
  const { volume } = useVolume();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [canPlayAudio, setCanPlayAudio] = useState(false);
  const [showMusicList, setShowMusicList] = useState(false);

  const getInitialMusic = () => {
    const saved = localStorage.getItem(MUSIC_STORAGE_KEY);
    const valid = musicList.find((m) => m.name === saved);
    return valid?.src || musicList[0].src;
  };

  const [currentMusic, setCurrentMusic] = useState(getInitialMusic);

  // Permitir audio tras primer clic
  useEffect(() => {
    const enableAudio = () => {
      setCanPlayAudio(true);
      window.removeEventListener("click", enableAudio);
    };
    window.addEventListener("click", enableAudio);
    return () => window.removeEventListener("click", enableAudio);
  }, []);

  // Reproducir música
  useEffect(() => {
    if (!canPlayAudio) return;
    const audio = new Audio(currentMusic);
    audio.loop = true;
    audio.volume = volume;

    audio
      .play()
      .then(() => {
        audioRef.current = audio;
      })
      .catch((err) => {
        console.error("Error al reproducir música:", err);
      });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [currentMusic, canPlayAudio]);

  // Actualizar volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const selectMusic = (music) => {
    setCurrentMusic(music.src);
    localStorage.setItem(MUSIC_STORAGE_KEY, music.name);
    setShowMusicList(false);
  };

  const currentMusicName = musicList.find((m) => m.src === currentMusic)?.name;

  return (
    <div className="absolute bottom-5 left-10 z-50">
      <div className="flex items-center gap-2">
        <Button onClick={() => setShowMusicList(!showMusicList)} circular>
          🎵
        </Button>
        <span className="text-white text-sm font-semibold truncate max-w-[160px]">
          {currentMusicName}
        </span>
      </div>

      {/* Lista de canciones */}
      <div
        className={`absolute bottom-full mb-2 left-0 transition-all duration-200 overflow-hidden ${
          showMusicList
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } bg-white rounded-xl shadow-xl w-56 border border-gray-200`}
      >
        {musicList.map((music) => {
          const isActive = music.src === currentMusic;
          return (
            <button
              key={music.name}
              type="button"
              onClick={() => selectMusic(music)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                isActive
                  ? "bg-gray-200 font-semibold text-gray-800"
                  : "text-gray-600"
              }`}
            >
              {isActive ? "✓ " : ""}
              {music.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BackgroundMusic;
