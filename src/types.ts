export type CardColor = "red" | "blue" | "black" | "empty";
export type Role = "leader" | "agent" | "spectator";
export type TeamColor = "red" | "blue";
export type GameMode = "online" | "tutorial";

export type Clue = {
  word: string;
  cards: Card[];
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
    clueList: Clue[];
  };
  red: {
    leader: User | null;
    agents: User[];
    clueList: Clue[];
  };
};

export type Message = {
  team: string;
  user: string;
  message: string;
  isLog?: boolean;
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
  color: TeamColor | null;
  role: Role | null;
};

/**
 * Define el estado de una partida
 */
export type GameState = {
  isGameStarted: boolean;
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
 * Distintos tipos de funciones que puede ejecutar el gameReducer
 */
export type DispatchActions =
  | { type: "SET_USER"; user: User }
  | { type: "SET_TEAM"; user: User; team: TeamColor; role: Role }
  | { type: "SET_STATE"; state: GameState }
  | { type: "SET_CLUE"; word: string; cards: Card[] }
  | { type: "REVEAL_CARD"; cardText: Card["word"] }
  | { type: "SELECT_CARD"; cardText: Card["word"] }
  | { type: "NEXT_TURN" }
  | { type: "END_GAME" }
  | { type: "SEND_MESSAGE"; message: Message };

/**
 * Define las acciones que un usuario puede realizar en una partida
 */
export interface UserActions {
  setClue: (clue: Clue) => void;
  selectCard: (cardText: Card["word"]) => void;
  revealCard: (cardText: Card["word"]) => void;
  isMyTurn: () => boolean;
  nextTurn: () => void;
  leaveGame: () => void;
  genericPopup?: { isOpen: boolean; message: string };
  showPopup?: (message: string) => void;
}

export interface TutorialActions {
  setInitialState: () => void;
  goNextStep: () => void;
  goPreviousStep: () => void;
  isLastStep: () => boolean;
  currentStep: TutorialStep;
}

export type ExpectedTutorialAction =
  | { type: "giveClue"; payload: { word: string[] } }
  | { type: "selectCard"; payload: { words: string[] } }
  | { type: "flipCard"; payload: { words: string[] } }
  | { type: "nextTurn" };

export type TutorialStep = {
  title: string;
  description: string;
  highlightSelector?: string[];
  expectedAction?: ExpectedTutorialAction;
} | null;
