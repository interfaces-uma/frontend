import { useGameState } from "@/context/game/GameContext";
import type { LobbyManager } from "../manager/LobbyManager";
import { socket } from "@/features/online/service/socket";
import type { Role, TeamColor } from "@/types";

export const useLobbyManager = (): LobbyManager => {
  const { state, dispatch } = useGameState();
  const gameMode = state.mode;

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
    const user = state.user;
    const code = state.code;

    if (gameMode !== "tutorial") {
      socket.emit("joinTeam", { user, color, role }, code);
    } else {
      dispatch({ type: "SET_TEAM", role, team: color, user: state.user });
    }
  };

  const startGame = () => {
    if (gameMode === "online") {
      socket.emit("startGame");
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
