import type { Role, TeamColor, Teams, User } from "@/types";

export interface LobbyManager {
  getRoomCode(): string;
  getTeams(): Teams;
  getPlayerName(): string;
  getPlayers(): User[];
  leaveTeam(): void;

  /**
   * Une el jugador al lobby
   * @param name Nombre del jugador
   */
  joinSlot(color: TeamColor, role: Role): void;

  /**
   * Comienza la partida
   */
  startGame(): void;
}
