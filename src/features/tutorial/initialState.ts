import type { GameState } from "@/types";
import tutorialCards from "./cardList";

const initialState: GameState = {
  isGameStarted: true,
  mode: "tutorial",
  code: "tutorial",
  user: {
    id: "tutorial",
    name: "usuario",
    color: "blue",
    role: "leader",
  },
  players: [],
  teams: {
    blue: {
      leader: {
        id: "tutorial",
        name: "usuario",
        color: "blue",
        role: "leader",
      },
      agents: [],
      clueList: [],
    },
    red: {
      leader: null,
      agents: [],
      clueList: [],
    },
  },
  cards: tutorialCards,
  turn: {
    team: "blue",
    role: "leader",
  },
  clue: null,
  messages: [],
};

export default initialState;
