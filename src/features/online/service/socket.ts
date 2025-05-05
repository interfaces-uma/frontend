import type {
  Card,
  Clue,
  GameState,
  Message,
  Role,
  TeamColor,
  User,
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
    callback: (response: { success: boolean; message?: string }) => void,
  ) => void;
  sendMessage: (message: Message, roomCode: string) => void;
  startGame: (
    roomCode: string,
    callback: (response: { success: boolean; message?: string }) => void,
  ) => void;
  sendClue: (clue: Clue) => void;
  guessCard: (card: Card) => void;
  leaveTeam: (code: string, user: User) => void;
  nextTurn: () => void;
}

interface ServerToClientEvents {
  updateState: (state: GameState) => void;
  redirectGame: () => void;
  endGame: (state: GameState, winner: TeamColor) => void;
  updateMessages: (message: Message) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.BACKEND_URL,
);

export { socket };
