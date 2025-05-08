import hoverSoundFile from "@/assets/hover.mp3";
import { useNarrator } from "@/features/shared/components/Narrator";
import { huseVolume } from "@/context/hoverVolume/hoverVolumeContext";
import { useEffect, useRef } from "react";

export const useHoverSound = () => {
  const { hvolume } = huseVolume();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { speak } = useNarrator();

  // Crear instancia única
  useEffect(() => {
    audioRef.current = new Audio(hoverSoundFile);
    audioRef.current.volume = hvolume;
  }, []);

  // Actualizar volumen al cambiar
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = hvolume;
    }
  }, [hvolume]);

  const playHoverSound = (text?: string) => {
    if (text) {
      speak(text);
    }

    const enabled = localStorage.getItem("hvolume") !== "0";
    if (enabled && audioRef.current) {
      audioRef.current.currentTime = 0; // Reiniciar para permitir reproducir múltiples veces
      audioRef.current.play().catch(() => {});
    }
  };

  return { playHoverSound };
};
