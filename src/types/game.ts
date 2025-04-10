export type Card = {
  word: string;
  color: string;
  clicked: boolean;
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
