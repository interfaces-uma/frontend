import homePhoto from "@/assets/homePhoto.webp";
import Name from "@/features/lobby/components/Name";
import Settings from "@/features/settings/components/Settings";
import BackgroundMusic from "@/features/shared/components/BackgroundMusic";
import Button from "@/features/shared/components/Button";
import SettingsIcon from "@/features/shared/components/Icons/IconSettings";
import Popup from "@/features/shared/components/Popup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Home() {
	const { t } = useTranslation();
	const [showSettings, setShowSettings] = useState(false);
	const [showName, setShowName] = useState(false);
	const [showNameCode, setShowNameCode] = useState(false);
	const [isPopupOpen, setPopupOpen] = useState(false);

	const openSettings = () => setShowSettings(!showSettings);
	const openName = () => setShowName(!showName);
	const openNameCode = () => {
		setShowName(!showName);
		setShowNameCode(!showNameCode);
	};
	const openPopup = () => setPopupOpen(!isPopupOpen);
	return (
		<>
			{/* Vista movil */}
			<div className="w-full h-full bg-fondo overflow-hidden md:hidden">
				<div className="flex flex-col mx-[15%] justify-center items-center h-full">
					<h1 className="text-center text-[clamp(3rem,5.5vw,100.5rem)]/12 w-full text-white mt-10">
						CÓDIGO SECRETO
					</h1>
					<img
						src={homePhoto}
						alt="home"
						className="aspect-square w-full mt-5 lg:w-[30%]"
					/>
					<div id="botones" className="h-[25%] w-full mt-5 flex flex-col">
						<Button
							onClick={openName}
							style="w-full h-[30%] m-auto w-75 h-25 bg-fondoAzul hover:brightness-85 text-fondo"
						>
							{t("create_game")}
						</Button>
						<Button
							onClick={openNameCode}
							style="w-full h-[30%] m-auto w-75 h-25 bg-fondoRojo hover:brightness-85 text-fondo"
						>
							{t("join_game")}
						</Button>
						<Button
							onClick={openPopup}
							style="w-full h-[30%] m-auto"
							narrator={t("how_to_play")}
						>
							{t("how_to_play")}
						</Button>
					</div>
					<div
						id="opciones"
						className="flex justify-center items-center gap-4 mt-5 mb-5 w-full"
					>
						<Button
							narrator={t("settings")}
							onClick={openSettings}
							circular
							style="w-13 h-13 flex items-center justify-center"
						>
							<SettingsIcon stroke="fondo" />
						</Button>
						<BackgroundMusic />
					</div>
				</div>
				{showSettings && <Settings onClose={openSettings} />}
				{showName && !showNameCode && <Name onClose={openName} />}
				{showNameCode && <Name onClose={openNameCode} unirse />}
				<Popup
					isOpen={isPopupOpen}
					onClose={openPopup}
					message={t("tutorial_under_construction")}
				/>
				<Popup autoWelcome />
			</div>

			{/* Vista pc */}
			<div className="bg-fondo h-screen w-screen flex-col items-center justify-center hidden md:flex">
				<h1 className="text-center text-[clamp(3rem,5.5vw,100.5rem)]/12 w-full text-white">
					CÓDIGO SECRETO
				</h1>
				<img src={homePhoto} alt="not found" className="mt-10 w-[25%]" />

				<div className="flex items-center gap-6 mt-10">
					<Button onClick={openName}>{t("create_game")}</Button>
					<Button narrator={t("settings")} onClick={openSettings} circular>
						<SettingsIcon stroke="fondo" />
					</Button>
					<Button onClick={openNameCode}>{t("join_game")}</Button>
				</div>

				<div className="absolute top-3 right-3">
					<Button onClick={openPopup} narrator={t("how_to_play")}>
						{t("how_to_play")}
					</Button>
				</div>

				<div className="absolute left-5 bottom-5">
					<BackgroundMusic showText={true} />
				</div>

				{showSettings && <Settings onClose={openSettings} />}
				{showName && !showNameCode && <Name onClose={openName} />}
				{showNameCode && <Name onClose={openNameCode} unirse />}

				{/* Tutorial popup manual */}
				<Popup
					isOpen={isPopupOpen}
					onClose={openPopup}
					message={t("tutorial_under_construction")}
				/>

				{/* Auto-popup de bienvenida + explicación */}
				<Popup autoWelcome />
			</div>
		</>
	);
}

export default Home;
