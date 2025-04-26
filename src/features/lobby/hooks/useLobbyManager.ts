import { useGameState } from "@/context/game/GameContext";
// import type { LobbyManager } from "../manager/LobbyManager";
import { socket } from "@/features/online/service/socket";
import type { Role, TeamColor, Teams, User } from "@/types";

export interface LobbyManager {
  getRoomCode(): string;
  getTeams(): Teams;
  getPlayerName(): string;
  getPlayers(): User[];
  leaveTeam(): void;
  joinSlot(color: TeamColor, role: Role): void;
  startGame(): void;
}

export const useLobbyManager = (): LobbyManager => {
  const { state, dispatch } = useGameState();

  /** Modo de juego de la partida
   * Puede ser online o tutorial
   */
  const gameMode = state.mode;

  /**
   * @returns El codigo de la sala en la que se encuentra el usuario
   */
  const getRoomCode = (): string => {
    return state.code;
  };

  /**
   * Devuelve la lista de jugadores de la partida. Tanto del equipo rojo como azul
   */
  const getTeams = (): Teams => {
    return state.teams;
  };

  /**
   * Devuelve la lista de jugadores sin asignar a ningun equipo
   */
  const getPlayers = (): User[] => {
    return state.players;
  };

  /**
   * Devuelve el nombre del usuario
   */
  const getPlayerName = () => {
    return state.user.name;
  };

  /**
   * Manda un evento al backend informando del usuario que quiere abandonar un equipo.
   * Será añadido a la lista de jugadores sin equipo
   */
  const leaveTeam = () => {
    dispatch({
      type: "SET_TEAM",
      role: "spectator",
      team: null,
      user: state.user,
    });
    socket.emit("leaveTeam", state.code, state.user);
  };

  /**
   * Los datos del jugador son cogidos del game context
   * Manda un evento al backend informando de la seleccion
   * @param color - Color al que quiero unirse el jugador
   * @param role - Role al que quiere unirse el jugador
   */
  const joinSlot = (color: TeamColor, role: Role) => {
    const user = state.user;
    const code = state.code;

    dispatch({ type: "SET_TEAM", role, team: color, user: state.user });
    socket.emit("joinTeam", { user, color, role }, code);
  };

  /**
   * Manda una peticion al backend para empezar la partida si esta es online
   * En caso de ser una partida offline/tutorial redirige al game
   */
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

  return {
    getRoomCode,
    getTeams,
    getPlayerName,
    joinSlot,
    startGame,
    getPlayers,
    leaveTeam,
  };
};
