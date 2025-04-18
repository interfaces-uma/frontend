import type { DispatchActions, GameState } from "@/types/game";
import type React from "react";
import { createContext, type ReactNode, useContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { initialGameState } from "./initialState";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<DispatchActions>;
};

const GameStateContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return {
    state: context.state,
    dispatch: context.dispatch,
  };
};
