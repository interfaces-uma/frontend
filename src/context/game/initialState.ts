import type { GameState } from "@/types";

export const initialGameState: GameState = {
  mode: "online",
  isGameStarted: false,
  code: "",
  user: {
    id: "",
    name: "",
    color: null,
    role: null,
  },
  players: [],
  teams: {
    blue: {
      leader: null,
      agents: [],
    },
    red: {
      leader: null,
      agents: [],
    },
  },
  cards: [],
  turn: {
    team: "red",
    role: "leader",
  },
  clue: null,
  messages: [],
};
