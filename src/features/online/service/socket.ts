import type { Message, GameState, Role, TeamColor, User } from "@/types";
import { type Socket, io } from "socket.io-client";

interface ClientToServerEvents {
  joinRoom: (code: string) => void;
  leaveRoom: () => void;
  joinTeam: (user: User, color: TeamColor, role: Role) => void;
  sendMessage: (message: Message) => void;
}

interface ServerToClientEvents {
  updateState: (state: GameState) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3001",
);

export { socket };
