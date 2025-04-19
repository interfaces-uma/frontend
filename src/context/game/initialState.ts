import type { GameState } from "@/types/game";

export const initialGameState: GameState = {
  mode: "online",
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
