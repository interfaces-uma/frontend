import type { Message } from "./message";

export type CardColor = "red" | "blue" | "black" | "empty";
export type Role = "leader" | "agent" | "spectator";
export type Team = "red" | "blue";
export type GameMode = "online" | "tutorial";

export type Card = {
  word: string;
  color: CardColor;
  isSelected: boolean;
  isFlipped: boolean;
  // handleClickCard?: (word: string) => void;
};

export type Board = {
  cards: Card[];
};

export type User = {
  id: string;
  name: string;
  color: string;
  role: Role | null;
};

export type GameState = {
  code: string;
  user: User;
  players: User[];
  teams: {
    blue: {
      leader: User;
      agents: User[];
    };
    red: {
      leader: User;
      agents: User[];
    };
  };
  cards: Card[];
  turn: {
    team: Team;
    role: Role;
  };
  clue: {
    word: string;
    count: number;
  } | null;
};

/**
 * Acciones que se pueden realizar en el juego
 */
export type DispatchActions =
  | { type: "UPDATE_STATE"; state: GameState }
  | { type: "START_GAME"; players: User[] }
  | { type: "SET_TEAM"; user: User; team: Team }
  | { type: "SET_ROLE"; user: User; role: Role }
  | { type: "SET_CLUE"; word: string; count: number }
  | { type: "REVEAL_CARD"; cardText: Card["word"] }
  | { type: "SEND_MESSAGE"; message: Message }
  | { type: "NEXT_TURN" }
  | { type: "END_GAME" };

export type GameActions = {
  setClue: (word: string, count: number) => void;
  selectCard: (word: string) => void;
  selectTeam: (user: User, team: Team) => void;
};
