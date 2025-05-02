import { useEffect, useState } from "react";
import Button from "@/components/Button";
import BackIcon from "@/components/Icons/IconBack";
import IconFontSize from "@/components/Icons/IconFontSize";
import IconLanguage from "@/components/Icons/IconLanguage";
import IconVolume from "@/components/Icons/IconVolume";
import { useVolume } from "@/context/backgroundVolume/backgroundVolumeContext";
import { huseVolume } from "@/context/hoverVolume/hoverVolumeContext";
import { cuseVolume } from "@/context/clickVolume/clickVolumeContext";

function Settings({
	onClose,
	roomCode,
}: { onClose: () => void; roomCode?: string }) {
	const fontSizes = [16, 18, 20, 22, 24];
	const { volume, setVolume } = useVolume();
	const { hvolume, hsetVolume } = huseVolume();
	const { cvolume, csetVolume } = cuseVolume();

	const [prevVolume, setPrevVolume] = useState<number | null>(null);
	const [hprevVolume, hsetPrevVolume] = useState<number | null>(null);
	const [cprevVolume, csetPrevVolume] = useState<number | null>(null);
	const [fontIndex, setFontSize] = useState(2);
	const [language, setLanguage] = useState("es");
	const [helpSound, setHelpSound] = useState(true);
	const [copied, setCopied] = useState(false);

	// Cargar desde localStorage
	useEffect(() => {
		const savedFont = localStorage.getItem("fontIndex");
		const savedLang = localStorage.getItem("language");
		const savedHelp = localStorage.getItem("helpSound");

		if (savedFont) setFontSize(Number(savedFont));
		if (savedLang) setLanguage(savedLang);
		if (savedHelp !== null) setHelpSound(savedHelp === "true");
	}, []);

	// Guardar en localStorage
	useEffect(() => {
		localStorage.setItem("fontIndex", fontIndex.toString());
		document.body.style.fontSize = `${fontSizes[fontIndex]}px`;
	}, [fontIndex]);

	useEffect(() => localStorage.setItem("language", language), [language]);

	useEffect(
		() => localStorage.setItem("helpSound", helpSound.toString()),
		[helpSound],
	);

	const toggleMute = () => {
		if (volume === 0 && prevVolume !== null) {
			setVolume(prevVolume);
			setPrevVolume(null);
		} else {
			setPrevVolume(volume);
			setVolume(0);
		}
	};

	const toggleHoverMute = () => {
		if (hvolume === 0 && hprevVolume !== null) {
			hsetVolume(hprevVolume);
			hsetPrevVolume(null);
		} else {
			hsetPrevVolume(hvolume);
			hsetVolume(0);
		}
	};

	const toggleClickMute = () => {
		if (cvolume === 0 && cprevVolume !== null) {
			csetVolume(cprevVolume);
			csetPrevVolume(null);
		} else {
			csetPrevVolume(cvolume);
			csetVolume(0);
		}
	};

	const handleCopy = () => {
		navigator.clipboard.writeText((roomCode ?? "").toString());
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-cartas w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 space-y-6 shadow-lg">
				{/* Encabezado */}
				<div className="flex justify-between items-center">
					<h2 className="text-xl font-bold text-fondo">Ajustes</h2>
					<Button onClick={onClose} inversed circular>
						<BackIcon />
					</Button>
				</div>

				{/* Volumen de música */}
				<div className="space-y-2">
					<label
						htmlFor="music-volume"
						id="music-volume"
						className="flex items-center gap-2 text-fondo font-medium cursor-pointer"
					>
						<IconVolume
							volume={volume}
							onClick={toggleMute}
							className="text-fondo"
							fill="currentColor"
						/>
						Volumen de música
					</label>
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={volume}
						onChange={(e) => setVolume(Number(e.target.value))}
						className="w-full accent-fondo"
					/>
				</div>

				{/* Sonido de clic */}
				<div className="space-y-2">
					<label
						htmlFor="cmusic-volume"
						id="music-volume"
						className="flex items-center gap-2 text-fondo font-medium cursor-pointer"
					>
						<IconVolume
							volume={cvolume}
							onClick={toggleClickMute}
							className="text-fondo"
							fill="currentColor"
						/>
						Volumen al click
					</label>
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={cvolume}
						onChange={(e) => csetVolume(Number(e.target.value))}
						className="w-full accent-fondo"
					/>
				</div>

				{/* Sonido al pasar el ratón */}
				<div className="space-y-2">
					<label
						htmlFor="hmusic-volume"
						id="music-volume"
						className="flex items-center gap-2 text-fondo font-medium cursor-pointer"
					>
						<IconVolume
							volume={hvolume}
							onClick={toggleHoverMute}
							className="text-fondo"
							fill="currentColor"
						/>
						Volumen al pasar el ratón
					</label>
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={hvolume}
						onChange={(e) => hsetVolume(Number(e.target.value))}
						className="w-full accent-fondo"
					/>
				</div>

				{/* Tamaño de texto */}
				<div className="space-y-2">
					<label
						htmlFor="font-size"
						className="flex items-center gap-2 text-fondo font-medium"
					>
						<IconFontSize className="text-fondo" fill="currentColor" />
						Tamaño del texto
					</label>
					<input
						type="range"
						min={0}
						max={4}
						step={1}
						value={fontIndex}
						onChange={(e) => setFontSize(Number(e.target.value))}
						className="w-full accent-fondo"
					/>
				</div>

				{/* Idioma */}
				<div className="space-y-2">
					<label
						htmlFor="languaje"
						className="flex items-center gap-2 text-fondo font-medium"
					>
						<IconLanguage className="text-fondo" fill="currentColor" />
						Idioma
					</label>
					<select
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
						className="w-full bg-cartas text-fondo font-semibold px-4 py-2 rounded-lg"
					>
						<option value="es">🇪🇸 Español</option>
						<option value="en">🇬🇧 English</option>
						<option value="fr">🇫🇷 Français</option>
						<option value="de">🇩🇪 Deutsch</option>
						<option value="ch">普通话</option>
					</select>
				</div>

				{/* Código de sala */}
				{roomCode && (
					<div className="text-fondo space-y-1">
						<button
							type="button"
							onClick={handleCopy}
							className="text-lg font-bold underline hover:text-yellow-300"
						>
							Código de sala: {roomCode}
						</button>
						{copied && <p className="text-sm opacity-60">¡Código copiado!</p>}
					</div>
				)}

				{/* Ayuda de sonido*/}
				<div className="flex items-center justify-between text-fondo font-medium pt-2 border-t border-fondo/20">
					<span>Ayuda de sonido</span>
					<input
						type="checkbox"
						checked={helpSound}
						onChange={() => setHelpSound(!helpSound)}
						className="w-6 h-6 accent-fondo"
					/>
				</div>
			</div>
		</div>
	);
}

export default Settings;
