import { useGameState } from "@/context/game/GameContext";
// import type { LobbyManager } from "../manager/LobbyManager";
import { socket } from "@/features/online/service/socket";
import type { Role, TeamColor, Teams, User } from "@/types";

export interface LobbyManager {
  /**
   * @returns El codigo de la sala en la que se encuentra el usuario
   */
  getRoomCode(): string;
  /**
   * Devuelve la lista de jugadores de la partida. Tanto del equipo rojo como azul
   */
  getTeams(): Teams;
  /**
   * Devuelve la lista de jugadores sin asignar a ningun equipo
   */
  getPlayers(): User[];
  /**
   * Devuelve el nombre del usuario
   */
  getPlayerName(): string;
  /**
   * Manda un evento al backend informando del usuario que quiere abandonar un equipo.
   * Será añadido a la lista de jugadores sin equipo
   */
  leaveTeam(): void;
  /**
   * Los datos del jugador son cogidos del game context
   * Manda un evento al backend informando de la seleccion
   * @param color - Color al que quiero unirse el jugador
   * @param role - Role al que quiere unirse el jugador
   */
  joinSlot(color: TeamColor, role: Role): void;
  /**
   * Manda una peticion al backend para empezar la partida si esta es online
   * En caso de ser una partida offline/tutorial redirige al game
   */
  startGame(): void;
  /**
   * Manda un evento al backend informando de que el jugador quiere abandonar la partida
   */
  leaveGame(): void;
}

/**
 * Hook que gestiona la logica de la sala
 * @returns LobbyManager
 */
export const useLobbyManager = (): LobbyManager => {
  const { state, dispatch } = useGameState();

  /** Modo de juego de la partida
   * Puede ser online o tutorial
   */
  const gameMode = state.mode;

  const getRoomCode = (): string => {
    return state.code;
  };

  const getTeams = (): Teams => {
    return state.teams;
  };

  const getPlayers = (): User[] => {
    return state.players;
  };

  const getPlayerName = () => {
    return state.user.name;
  };

  const leaveTeam = () => {
    dispatch({
      type: "SET_TEAM",
      role: "spectator",
      team: null,
      user: state.user,
    });
    socket.emit("leaveTeam", state.code, state.user);
  };

  const joinSlot = (color: TeamColor, role: Role) => {
    const user = state.user;
    const code = state.code;
    if (state.mode === "online") {
      socket.emit("joinTeam", { user, color, role }, code, (res) => {
        if (!res.success) {
          //alert(res.message);
        } else {
          dispatch({ type: "SET_TEAM", role, team: color, user });
        }
      });
    } else {
      dispatch({ type: "SET_TEAM", role, team: color, user: state.user });
    }
  };

  const startGame = () => {
    if (gameMode === "online") {
      socket.emit(
        "startGame",
        state.code,
        (response: { success: boolean; message?: string }) => {
          if (!response.success) {
            alert(response.message);
          }
        },
      );
    } else {
      // redirect to game TODO
    }
  };
  const leaveGame = () => {
    if (state.mode === "online") {
      socket.emit("leaveRoom", state.user, state.code);
    }
  };

  return {
    getRoomCode,
    getTeams,
    getPlayerName,
    joinSlot,
    startGame,
    getPlayers,
    leaveTeam,
    leaveGame,
  };
};
