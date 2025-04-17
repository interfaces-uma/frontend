import Home from "@/pages/Home";
import Lobby from "@/pages/Lobby";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { GameProvider } from "@/context/game/GameContext";
import "@/style.css";
import GamePage from "./pages/GamePage";

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
  <GameProvider socket={null}>
    <RouterProvider router={router} />,
  </GameProvider>,
);
