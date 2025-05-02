import clickSoundFile from "@/assets/newClick.mp3";
import { useEffect, useRef } from "react";
import { cuseVolume } from "@/context/clickVolume/clickVolumeContext";

export const useClickSound = () => {
  const { cvolume } = cuseVolume();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Crear instancia única
  useEffect(() => {
    audioRef.current = new Audio(clickSoundFile);
    audioRef.current.volume = cvolume;
  }, []);

  // Actualizar volumen al cambiar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = cvolume;
    }
  }, [cvolume]);

  const playClickSound = () => {
    const enabled = localStorage.getItem("cvolume") !== "0";
    if (enabled && audioRef.current) {
      audioRef.current.currentTime = 0; // Reiniciar para permitir reproducir múltiples veces
      audioRef.current.play().catch(() => {});
    }
  };

  return { playClickSound };
};
