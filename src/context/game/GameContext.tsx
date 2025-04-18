import type { DispatchActions, GameState } from "@/types/game";
import type React from "react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { gameReducer } from "./gameReducer";
import { initialGameState } from "./initialState";
import { socket } from "@/features/online/service/socket";

type GameContextType = {
  state: GameState;
  dispatch: React.Dispatch<DispatchActions>;
};

const GameStateContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    socket.on("updateState", (newState) => {
      console.log(newState);
      dispatch({ type: "SET_STATE", state: newState });
    });

    return () => {
      socket.off("updateState", (newState) => {
        dispatch({ type: "SET_STATE", state: newState });
      });
    };
  }, []);

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
  return context;
};
