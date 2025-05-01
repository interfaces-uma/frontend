import hoverSoundFile from "@/assets/hover.mp3";
import { useVolume } from "@/context/Volume/VolumeContext";

export const useHoverSound = () => {
	const { volume } = useVolume();
	const helpSound = localStorage.getItem("helpSound") === "true";

	const playHoverSound = () => {
		if (helpSound && volume > 0) {
			const audio = new Audio(hoverSoundFile);
			audio.volume = volume;
			audio.play().catch(() => {});
		}
	};

	return { playHoverSound };
};
