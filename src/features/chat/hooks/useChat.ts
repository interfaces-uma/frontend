import { useGameState } from "@/context/game/GameContext";
import { socket } from "@/features/online/service/socket";
import type { Message } from "@/types";
import { useEffect, useRef } from "react";

export function useChat() {
  const { state, dispatch } = useGameState();

  /**
   * Metodo que se ejecuta al enviar un mensaje
   * En caso de ser online manda un evento la backend
   * En caso de ser !online ejecuta dispathc directamente sobre el game state
   * @param message - Mensaje a enviar
   */
  const handleSendMessage = (message: string) => {
    const msg: Message = {
      message,
      user: state.user.name,
      team: state.user.color || "spectator",
    };

    if (state.mode === "online") {
      socket.emit("sendMessage", msg, state.code);
    } else {
      dispatch({ type: "SEND_MESSAGE", message: msg });
    }
  };

  const handleRecieveMessage = (message: Message) => {
    dispatch({ type: "SEND_MESSAGE", message });
  };

  const messagesEndRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [state.messages]); // Cuando los datos cambien (es decir, cuando se agregue un nuevo mensaje)

  return {
    handleSendMessage,
    handleRecieveMessage,
    messagesEndRef,
  };
}
