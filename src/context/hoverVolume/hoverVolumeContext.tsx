import { createContext, useContext, useEffect, useState } from "react";

type VolumeContextType = {
	hvolume: number;
	hsetVolume: (v: number) => void;
};

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export function HoverVolumeProvider({
	children,
}: { children: React.ReactNode }) {
	const [hvolume, hsetVolume] = useState(0.5);

	useEffect(() => {
		const saved = localStorage.getItem("hvolume");
		if (saved !== null) {
			hsetVolume(Number(saved));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("hvolume", hvolume.toString());
	}, [hvolume]);

	return (
		<VolumeContext.Provider value={{ hvolume, hsetVolume }}>
			{children}
		</VolumeContext.Provider>
	);
}

export function huseVolume() {
	const context = useContext(VolumeContext);
	if (!context) {
		throw new Error("useVolume must be used within a VolumeProvider");
	}
	return context;
}
