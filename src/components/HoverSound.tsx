import hoverSoundFile from "@/assets/hover.mp3";
import { useVolume } from "@/context/hoverVolume/hoverVolumeContext";

export const useHoverSound = () => {
	const { volume } = useVolume();
	const hoverSound = localStorage.getItem("hvolume") === "true";

	const playHoverSound = () => {
		if (hoverSound && volume > 0) {
			const audio = new Audio(hoverSoundFile);
			audio.volume = volume;
			audio.play().catch(() => {});
		}
	};

	return { playHoverSound };
};
