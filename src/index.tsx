// src/main.tsx o src/index.tsx
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@/style.css";
import "./i18n";

// Set font size from localStorage on initial load
const savedFontIndex = localStorage.getItem("fontIndex");
if (savedFontIndex) {
  const fontSizes = [20, 22, 24, 26, 28];
  document.documentElement.style.setProperty(
    "--font-size",
    `${fontSizes[Number(savedFontIndex)]}px`,
  );
}

// Páginas
import Home from "@/pages/Home";
import Lobby from "@/pages/LobbyPage";
import GamePage from "@/pages/GamePage";

// Contextos
import { GameProvider } from "@/context/game/GameContext";
import { VolumeProvider } from "@/context/backgroundVolume/backgroundVolumeContext";
import { HoverVolumeProvider } from "@/context/hoverVolume/hoverVolumeContext";
import { ClickVolumeProvider } from "@/context/clickVolume/clickVolumeContext";

// Rutas
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/lobby", element: <Lobby /> },
  { path: "/game", element: <GamePage /> },
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
