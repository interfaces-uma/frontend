import type { GameState } from "@/types/game";
import { createContext, useContext, useState } from "react";

type GameContextType = {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
};

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<GameState>();
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
