import { createContext, useContext, useEffect, useState } from "react";

type VolumeContextType = {
  cvolume: number;
  csetVolume: (v: number) => void;
};

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export function ClickVolumeProvider({
  children,
}: { children: React.ReactNode }) {
  const [cvolume, csetVolume] = useState(0.5);

  useEffect(() => {
    const saved = localStorage.getItem("cvolume");
    if (saved !== null) {
      csetVolume(Number(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cvolume", cvolume.toString());
  }, [cvolume]);

  return (
    <VolumeContext.Provider value={{ cvolume, csetVolume }}>
      {children}
    </VolumeContext.Provider>
  );
}

export function cuseVolume() {
  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error("useVolume must be used within a VolumeProvider");
  }
  return context;
}
