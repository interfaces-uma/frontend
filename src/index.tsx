import Home from "@/pages/Home";
import Lobby from "@/pages/LobbyPage";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { GameProvider } from "@/context/game/GameContext";
import { VolumeProvider } from "@/context/backgroundVolume/backgroundVolumeContext";
import { HoverVolumeProvider } from "@/context/hoverVolume/hoverVolumeContext";
import { ClickVolumeProvider } from "@/context/clickVolume/clickVolumeContext";
import "@/style.css";
import GamePage from "./pages/GamePage";
import OrientationLock from "./components/OrientationLock";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/lobby",
		element: <Lobby />,
	},
	{
		path: "/game",
		element: <GamePage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<GameProvider>
		<OrientationLock />
		<VolumeProvider>
			<ClickVolumeProvider>
				<HoverVolumeProvider>
					<RouterProvider router={router} />
				</HoverVolumeProvider>
			</ClickVolumeProvider>
		</VolumeProvider>
	</GameProvider>,
);
