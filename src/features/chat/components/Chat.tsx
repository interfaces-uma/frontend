import { useGameState } from "@/context/game/GameContext";
import { useChat } from "@/features/chat/hooks/useChat";
import { socket } from "@/features/online/service/socket";
import type { Message } from "@/types";
import { useEffect, useState } from "react";

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
          {data.isLog ? (
            <strong className="text-amber-500 w-full block text-center">
              {data.message}
            </strong>
          ) : (
            <>
              <strong
                className={
                  data.team === "red"
                    ? "text-fuerteRojo ml-2"
                    : data.team === "blue"
                      ? "text-fuerteAzul ml-2"
                      : "text-fondo ml-2"
                }
              >
                {data.user}
              </strong>
              : {data.message}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function Chat() {
  const { state } = useGameState();
  const { handleSendMessage, handleRecieveMessage } = useChat();

  const [input, setInput] = useState<string>("");

  const team = state.user.color;

  const messages = state.messages;

  const { messagesEndRef } = useChat();

  useEffect(() => {
    socket.on("updateMessages", (message: Message) => {
      handleRecieveMessage(message);
    });

    return () => {
      socket.off("updateMessages");
    };
  }, []);

  return (
    <div className="bg-chat flex flex-col justify-center border-fondo border-4 rounded-lg w-full">
      <div
        className={
          team === "red"
            ? "bg-fuerteRojo flex w-full rounded-tl rounded-tr justify-center items-center text-white"
            : team === "blue"
              ? "bg-fuerteAzul flex w-full rounded-tl rounded-tr justify-center items-center text-black"
              : "bg-fondo flex w-full rounded-tl rounded-tr justify-center items-center text-black"
        }
      >
        <strong
          className={
            team === "red"
              ? " text-white"
              : team === "blue"
                ? " text-black"
                : " text-cartas"
          }
        >
          CHAT
        </strong>
      </div>

      {showMessages(messages, messagesEndRef)}
      <div
        className={
          team === "red"
            ? "bg-fuerteRojo flex rounded-bl rounded-br text-white"
            : team === "blue"
              ? "bg-fuerteAzul flex rounded-bl rounded-br text-black"
              : "bg-fondo flex rounded-bl rounded-br text-cartas"
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
          className="w-full p-2 outline-none focus:outline-none border-none"
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
              ? " bg-fuerteRojo p-2 rounded-br hover:brightness-90"
              : team === "blue"
                ? " bg-fuerteAzul p-2 rounded-br hover:brightness-90"
                : " bg-fondo p-2 rounded-br hover:brightness-90"
          }
        >
          <strong>Enviar</strong>
        </button>
      </div>
    </div>
  );
}

export default Chat;
