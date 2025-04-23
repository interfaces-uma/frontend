export type CardColor = "red" | "blue" | "black" | "empty";
export type Role = "leader" | "agent" | "spectator";
export type TeamColor = "red" | "blue" | null;
export type GameMode = "online" | "tutorial";

export type Clue = {
  word: string;
  count: number;
} | null;

type minimapCell = {
  color: "red" | "blue" | "black" | "empty";
};
export type minimap = {
  minimap: minimapCell[][];
};

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

export type Message = {
  team: string;
  user: string;
  message: string;
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
  clue: Clue;
  messages: Message[];
};

/**
 * Acciones que se pueden realizar en el juego desde gameReducer
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
