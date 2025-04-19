import { useGameState } from "@/context/game/GameContext";
import type { LobbyManager } from "../manager/LobbyManager";
import { socket } from "@/features/online/service/socket";
import type { Role, TeamColor } from "@/types/game";

export const useLobbyManager = (): LobbyManager => {
  const { state, dispatch } = useGameState();

  const getRoomCode = () => {
    return state.code;
  };

  const getTeams = () => {
    return state.teams;
  };

  const getPlayerName = () => {
    return state.user.name;
  };

  const joinSlot = (color: TeamColor, role: Role) => {
    const mode = state.mode;
    const user = state.user;

    if (mode === "tutorial") {
      socket.emit("join", { user, color, role });
    } else {
      dispatch({ type: "SET_TEAM", role, team: color, user: state.user });
    }
  };

  const startGame = () => {
    const mode = state.mode;
    const user = state.user;

    if (mode === "online") {
      socket.emit("startGame", { user });
    } else {
      // redirect to game TODO
    }
  };

  return {
    getRoomCode,
    getTeams,
    getPlayerName,
    joinSlot,
    startGame,
  };
};
