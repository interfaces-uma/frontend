export type Card = {
  word: string;
  color: "red" | "blue" | "black" | "empty";
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
};

export type GameState = {
  code: string;
  players: User[]; // para jugadores aun no asignados a equipos en el lobby
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
    team: "red" | "blue";
    role: "leader" | "agent";
  };
  clue: {
    word: string;
    count: number;
  } | null;
};
