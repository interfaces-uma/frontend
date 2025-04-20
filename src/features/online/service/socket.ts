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
    user: User,
    code: string,
    callback: (response: { success: boolean; message?: string }) => void,
  ) => void;
  createRoom: (
    user: User,
    callback: (response: { success: boolean; message?: string }) => void,
  ) => void;
  leaveRoom: (user: User, code: string) => void;
  joinTeam: (
    data: { user: User; color: TeamColor; role: Role },
    code: string,
  ) => void;
  sendMessage: (message: Message, roomCode: string) => void;
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
