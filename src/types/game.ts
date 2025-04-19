import type { Message } from "./message";

export type CardColor = "red" | "blue" | "black" | "empty";
export type Role = "leader" | "agent" | "spectator";
export type TeamColor = "red" | "blue" | null;
export type GameMode = "online" | "tutorial";

export type Teams = {
  blue: {
    leader: User | null;
    agents: User[];
  };
  red: {
    leader: User | null;
    agents: User[];
  };
};

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
  color: TeamColor;
  role: Role | null;
};

export type GameState = {
  mode: GameMode;
  code: string;
  user: User;
  players: User[];
  teams: Teams;
  cards: Card[];
  turn: {
    team: TeamColor;
    role: Role;
  };
  clue: {
    word: string;
    count: number;
  } | null;
  messages: Message[];
};

/**
 * Acciones que se pueden realizar en el juego
 */
export type DispatchActions =
  | { type: "SET_USER"; user: User }
  | { type: "SET_TEAM"; user: User; team: TeamColor; role: Role }
  | { type: "SET_STATE"; state: GameState }
  | { type: "SET_CLUE"; word: string; count: number }
  | { type: "REVEAL_CARD"; cardText: Card["word"] }
  | { type: "SELECT_CARD"; cardText: Card["word"] }
  | { type: "NEXT_TURN" }
  | { type: "END_GAME" }
  | { type: "SEND_MESSAGE"; message: Message };

export type GameActions = {
  setClue: (word: string, count: number) => void;
  selectCard: (word: string) => void;
  selectTeam: (user: User, team: TeamColor, role: Role) => void;
};
