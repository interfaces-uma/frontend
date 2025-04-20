import { socket } from "@/features/online/service/socket";
import type { Message } from "@/types";
import { useEffect, useRef } from "react";
import { useOnlineManager } from "@/features/online/hooks/useOnlineManager";

export function useChat() {
  const { state } = useOnlineManager();

  const handleSendMessage = (message: string) => {
    const msg: Message = {
      message,
      user: state.user.name,
      team: state.user.color || "red",
    };

    socket.emit("sendMessage", msg, state.code);
    console.log(state);
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
