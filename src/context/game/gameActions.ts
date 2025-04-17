import type {
  DispatchActions,
  GameActions,
  GameMode,
  Team,
  User,
} from "@/types/game";
import type React from "react";
import type { Socket } from "socket.io-client";

export const createGameActions = (
  dispatch: React.Dispatch<DispatchActions>,
  mode: GameMode,
  socket: Socket | null,
): GameActions => {
  const emitIfOnline = (event: string, data: unknown) => {
    if (mode === "online" && socket) {
      socket.emit(event, data);
    }
  };
  return {
    setClue: (word: string, count: number) => {
      dispatch({ type: "SET_CLUE", word, count });
      emitIfOnline("SET_CLUE", { word, count });
    },
    selectCard: (word: string) => {
      dispatch({ type: "REVEAL_CARD", cardText: word });
      emitIfOnline("REVEAL_CARD", { word });
    },
    selectTeam: (user: User, team: Team) => {
      dispatch({ type: "SET_TEAM", user, team });
      emitIfOnline("SET_TEAM", { user, team });
    },
  };
};
