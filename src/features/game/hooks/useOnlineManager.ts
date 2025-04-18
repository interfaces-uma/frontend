import { socket } from "@/features/game/service/socket";
import { useEffect } from "react";
import { useGameState } from "@/context/game/GameContext";

export const useOnlineManager = () => {
  const { state, dispatch } = useGameState();
  useEffect(() => {
    socket.on("updateState", (newState) => {
      dispatch({ type: "SET_STATE", state: newState });
    });

    return () => {
      socket.off("updateState", (newState) => {
        dispatch({ type: "SET_STATE", state: newState });
      });
    };
  }, []);

  return {
    state,
    dispatch,
  };
};
