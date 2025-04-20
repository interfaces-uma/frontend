import type {
  Message,
  GameState,
  Role,
  TeamColor,
  User,
  Clue,
  Card,
} from "@/types";
import { type Socket, io } from "socket.io-client";

interface ClientToServerEvents {
  joinRoom: (
    code: string,
    user: User,
    callback: (response: { success: boolean; message?: string }) => void,
  ) => void;
  createRoom: (
    user: User,
    callback: (response: { success: boolean; message?: string }) => void,
  ) => void;
  leaveRoom: () => void;
  joinTeam: (data: { user: User; color: TeamColor; role: Role }) => void;
  sendMessage: (message: Message) => void;
  startGame: () => void;
  sendClue: (clue: Clue) => void;
  guessCard: (card: Card) => void;
}

interface ServerToClientEvents {
  updateState: (state: GameState) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3001/",
);

export { socket };
