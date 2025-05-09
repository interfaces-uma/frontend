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
  {
    path: "/tutorial",
    element: <TutorialPage />,
  },
]);

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
