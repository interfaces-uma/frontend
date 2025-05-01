import type { Message } from "@/types";
import { useState } from "react";
import { useChat } from "@/features/chat/hooks/useChat";
import { useGameState } from "@/context/game/GameContext";

function showMessages(
  data: Message[],
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>  ERROR: tipo real es React.RefObject<HTMLUListElement> pero biome da warning
  messagesEndRef: any,
) {
  return (
    <ul
      ref={messagesEndRef}
      className="max-h-80 min-h-80 w-full overflow-y-auto overflow-x-hidden"
    >
      {data.map((data, index) => (
        <li
          key={index}
          className={index % 2 !== 0 ? "bg-gray-200 w-full text-l" : "text-l"}
        >
          <strong
            className={
              data.team === "red"
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
  const { state } = useGameState();
  const { handleSendMessage } = useChat();

  const [input, setInput] = useState<string>("");

  const team = state.user.color;

  const messages = state.messages;

  const { messagesEndRef } = useChat();

  return (
    <div className="bg-chat flex flex-col justify-center border-fondo border-4 rounded-lg w-full">
      <div
        className={
          team === "red"
            ? "bg-fuerteRojo flex w-full rounded-tl rounded-tr justify-center items-center text-white"
            : "bg-fuerteAzul flex w-full rounded-tl rounded-tr justify-center items-center text-black"
        }
      >
        <strong>CHAT</strong>
      </div>

      {showMessages(messages, messagesEndRef)}
      <div
        className={
          team === "red"
            ? "bg-fuerteRojo flex rounded-bl rounded-br text-white"
            : "bg-fuerteAzul flex rounded-bl rounded-br text-black"
        }
      >
        <input
          placeholder="Escribe un mensaje..."
          onChange={(event) => setInput(event.target.value)}
          value={input}
          onKeyDown={(event) => {
            if (event.key === "Enter" && input !== "") {
              handleSendMessage(input);
              setInput("");
            }
          }}
          className="mr-auto p-2 "
        />
        <button
          type="button"
          onClick={() => {
            if (input !== "") {
              handleSendMessage(input);
              setInput("");
            }
          }}
          className={
            team === "red"
              ? " bg-fuerteRojo ml-auto rounded-br hover:brightness-90"
              : " bg-fuerteAzul ml-auto rounded-br hover:brightness-90"
          }
        >
          <strong>Enviar</strong>
        </button>
      </div>
    </div>
  );
}

export default Chat;
