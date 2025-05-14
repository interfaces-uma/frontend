import { createContext, useContext, useEffect, useState } from "react";

type VolumeContextType = {
  volume: number;
  setVolume: (v: number) => void;
};

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export function VolumeProvider({ children }: { children: React.ReactNode }) {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const saved = localStorage.getItem("bgvolume");
    if (saved !== null) {
      setVolume(Number(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bgvolume", volume.toString());
  }, [volume]);

  return (
    <VolumeContext.Provider value={{ volume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
}

export function useVolume() {
  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error("useVolume must be used within a VolumeProvider");
  }
  return context;
}
