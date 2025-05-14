// src/main.tsx o src/index.tsx
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@/style.css";
import "./i18n";

// Páginas
import Home from "@/pages/Home";
import Lobby from "@/pages/LobbyPage";
import GamePage from "@/pages/GamePage";
import TutorialPage from "@/pages/TutorialPage";

// Contextos
import { GameProvider } from "@/context/game/GameContext";
import { VolumeProvider } from "@/context/backgroundVolume/backgroundVolumeContext";
import { HoverVolumeProvider } from "@/context/hoverVolume/hoverVolumeContext";
import { ClickVolumeProvider } from "@/context/clickVolume/clickVolumeContext";

// Set font size from localStorage on initial load
const savedFontIndex = localStorage.getItem("fontIndex");
if (savedFontIndex) {
  const fontSizes = [20, 22, 24, 26, 28];
  document.documentElement.style.setProperty(
    "--font-size",
    `${fontSizes[Number(savedFontIndex)]}px`,
  );
}

// Rutas
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/lobby", element: <Lobby /> },
  { path: "/game", element: <GamePage /> },
  { path: "/tutorial", element: <TutorialPage /> },
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
