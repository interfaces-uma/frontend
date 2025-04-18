import { useOnlineManager } from "./useOnlineManager";
import { socket } from "@/features/game/service/socket";
import type { Message } from "@/types/message";
import { useEffect, useRef } from "react";

export function useChat() {
  const { state } = useOnlineManager();

  // dispatch({ type: "SEND_MESSAGE", message: { message: "BUENASH", user } });

  // sendMessage -> Socket.emit("sendMessage", message)

  const handleSendMessage = (message: string) => {
    const msg: Message = {
      message,
      user: state.user.name,
      team: state.user.color || "red",
    };

    socket.emit("sendMessage", msg);
  };

  const messagesEndRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [state.messages]); // Cuando los datos cambien (es decir, cuando se agregue un nuevo mensaje)

  return {
    handleSendMessage,
    messagesEndRef,
  };
}
