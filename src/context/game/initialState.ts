import type { GameState } from "@/types/game";

export const initialGameState: GameState = {
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
      leader: {
        id: "",
        name: "",
        color: "blue",
        role: "leader",
      },
      agents: [],
    },
    red: {
      leader: {
        id: "",
        name: "",
        color: "red",
        role: "leader",
      },
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
