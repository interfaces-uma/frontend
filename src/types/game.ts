export type Card = {
  word: string;
  color: "red" | "blue" | "black" | "empty";
  isSelected: boolean;
  isFlipped: boolean;
  handleClickCard?: (word: string) => void;
};

export type Board = {
  cards: Card[];
};

export type User = {
  name: string;
};

export type GameState = {
  code: string;
  blueTeam: User[];
  redTeam: User[];
  cards: Card[];
};
