import { useGameState } from "@/context/game/GameContext";

export const useOnlineManager = () => {
  const { state, dispatch } = useGameState();

  return {
    state,
    dispatch,
  };
};
