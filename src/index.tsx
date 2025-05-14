<<<<<<< HEAD
// src/main.tsx o src/index.tsx
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@/style.css";
import "./i18n";

// Páginas
import Home from "@/pages/Home";
import Lobby from "@/pages/LobbyPage";
import GamePage from "@/pages/GamePage";

// Contextos
import { GameProvider } from "@/context/game/GameContext";
import { VolumeProvider } from "@/context/backgroundVolume/backgroundVolumeContext";
import { HoverVolumeProvider } from "@/context/hoverVolume/hoverVolumeContext";
import { ClickVolumeProvider } from "@/context/clickVolume/clickVolumeContext";
=======
import { VolumeProvider } from "@/context/backgroundVolume/backgroundVolumeContext";
import { ClickVolumeProvider } from "@/context/clickVolume/clickVolumeContext";
import { GameProvider } from "@/context/game/GameContext";
import { HoverVolumeProvider } from "@/context/hoverVolume/hoverVolumeContext";
import Home from "@/pages/Home";
import Lobby from "@/pages/LobbyPage";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "@/style.css";
import GamePage from "@/pages/GamePage";
import TutorialPage from "@/pages/TutorialPage";
>>>>>>> 27d27cdd65bed3353a05188c0d7c1d92a15297da

// Rutas
const router = createBrowserRouter([
<<<<<<< HEAD
	{ path: "/", element: <Home /> },
	{ path: "/lobby", element: <Lobby /> },
	{ path: "/game", element: <GamePage /> },
=======
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
  {
    path: "/tutorial",
    element: <TutorialPage />,
  },
>>>>>>> 27d27cdd65bed3353a05188c0d7c1d92a15297da
]);

// Renderizado principal con todos los contextos
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<GameProvider>
		<VolumeProvider>
			<ClickVolumeProvider>
				<HoverVolumeProvider>
					<RouterProvider router={router} />
				</HoverVolumeProvider>
			</ClickVolumeProvider>
		</VolumeProvider>
	</GameProvider>,
);
