import type { DispatchActions, GameMode, GameState } from "@/types/game";
import type React from "react";
import { createContext, type ReactNode, useContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { initialGameState } from "./initialState";
import { createGameActions } from "./gameActions";
import type { Socket } from "socket.io-client";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<DispatchActions>;
  socket: Socket | null;
};

const GameStateContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({
  children,
  socket,
}: { children: ReactNode; socket: Socket | null }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return (
    <GameStateContext.Provider value={{ state, dispatch, socket }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameProvider");
  }
  return context;
};

export const useGame = (mode: GameMode) => {
  const { state, dispatch, socket } = useGameState();
  const actions = createGameActions(dispatch, mode, socket);
  return { state, ...actions };
};
