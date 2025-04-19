import type { Role, TeamColor, Teams } from "@/types/game";

export interface LobbyManager {
  getRoomCode(): string;
  getTeams(): Teams;
  getPlayerName(): string;

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
