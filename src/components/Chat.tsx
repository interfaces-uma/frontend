import type { Message } from "@/types/message";
import { useEffect, useRef, useState } from "react";

function showMessages(
  data: Message[],
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>  ERROR: tipo real es React.RefObject<HTMLUListElement> pero biome da warning
  messagesEndRef: any,
) {
  return (
    <ul
      ref={messagesEndRef}
      className="max-h-80 min-h-80 max-w-70 overflow-y-auto overflow-x-hidden"
    >
      {data.map((data, index) => (
        <li
          key={index}
          className={index % 2 !== 0 ? "bg-gray-200 w-full text-l" : "text-l"}
        >
          <strong
            className={
              data.color === "red"
                ? "text-fuerteRojo ml-2"
                : "text-fuerteAzul ml-2"
            }
          >
            {data.user}
          </strong>
          : {data.message}
        </li>
      ))}
    </ul>
  );
}

function Chat() {
  const color = localStorage.getItem("color");
  const [newMessage, setNewMessage] = useState<Message>({
    color: color ? color : "NULL",
    user: "user",
    message: "",
  });

  const handleNewMessage = (text: string) => {
    setNewMessage({
      ...newMessage,
      message: text,
    });
  };

  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (newMessage.message === "") return;
    setMessages([...messages, newMessage]);
    setNewMessage({ ...newMessage, message: "" });
  };

  const messagesEndRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]); // Cuando los datos cambien (es decir, cuando se agregue un nuevo mensaje)

  return (
    <div className="bg-chat flex flex-col justify-center border-fondo border-4 rounded-lg">
      <div
        className={
          color === "red"
            ? "bg-fuerteRojo flex w-full rounded-tl rounded-tr justify-center items-center text-white"
            : "bg-fuerteAzul flex w-full rounded-tl rounded-tr justify-center items-center text-black"
        }
      >
        <strong>CHAT</strong>
      </div>

      {showMessages(messages, messagesEndRef)}
      <div
        className={
          color === "red"
            ? "bg-fuerteRojo flex w-full rounded-bl rounded-br text-white"
            : "bg-fuerteAzul flex w-full rounded-bl rounded-br text-black"
        }
      >
        <input
          placeholder="Escribe un mensaje..."
          value={newMessage.message}
          onChange={(event) => handleNewMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="flex-grow p-2 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSendMessage}
          className={
            color === "red"
              ? " bg-fuerteRojo px-4 py-2 whitespace-nowrap rounded-br hover:brightness-90"
              : " bg-fuerteAzul px-4 py-2 whitespace-nowrap rounded-br hover:brightness-90"
          }
        >
          <strong>Enviar</strong>
        </button>
      </div>
    </div>
  );
}

export default Chat;
