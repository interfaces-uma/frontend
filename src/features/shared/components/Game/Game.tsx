import { useGameState } from "@/context/game/GameContext";
import Chat from "@/features/chat/components/Chat";
import { socket } from "@/features/online/service/socket";
import Button from "@/features/shared/components/Button";
import ClueInput from "@/features/shared/components/ClueInput";
import Board from "@/features/shared/components/Game/Board";
import ClueList from "@/features/shared/components/Game/ClueList";
import GameStatus from "@/features/shared/components/Game/GameStatus";
import TeamInfo from "@/features/shared/components/Game/TeamInfo";
import FullScreenIcon from "@/features/shared/components/Icons/IconFullScreen";
import Popup from "@/features/shared/components/Popup";
import TimedPopup from "@/features/shared/components/TimedPopup";
import type { Card, Clue, GameState, UserActions } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MenuIcon from "../Icons/IconMenu";
import Menu from "../Menu";
import { useTranslation } from "react-i18next";

export default function Game({ manager }: { manager: UserActions }) {
  const { t } = useTranslation();
  const { state } = useGameState();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showEndPopup, setShowEndPopup] = useState(false);
  const [endMessage, setEndMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => setShowMenu(!showMenu);

  const handleConfirmExit = () => {
    manager.leaveGame();
    navigate("/");
  };

  const cards = { cards: state.cards };

  const handleClueSend = (word: string) => {
    const selectedCards = state.cards.filter((card: Card) => card.isSelected);
    if (selectedCards.length === 0 || word === "") return;
    const clue: Clue = { word, cards: selectedCards };
    manager.setClue(clue);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("endGame", (_state: GameState, winner: string) => {
      setEndMessage(`${t("the_team")} ${winner} ${t("has_won_the_game")}`);
      setShowEndPopup(true);
    });
    socket.on("redirectLobby", () => {
      console.log("Redirecting to lobby");
      navigate("/lobby");
    });
    return () => {
      socket.off("endGame");
      socket.off("redirectLobby");
    };
  }, []);

  const isActualLeaderTurn = (): boolean => {
    const currentColor = state.turn.team;
    return (
      state.user.role === "leader" &&
      state.user.color === currentColor &&
      state.user.role === state.turn.role
    );
  };

  return (
    <>
      <main className="bg-fondo w-full h-screen flex flex-col">
        <header
          className={
            state.user.color === "red"
              ? "flex bg-[#ce3a3a] justify-center items-center h-[8%] px-2"
              : "flex bg-fuerteAzul justify-center items-center h-[8%] px-2"
          }
        >
          <h1 className="flex h-full">
            <TeamInfo team="blue" />
            {isActualLeaderTurn() ? (
              <ClueInput onSend={handleClueSend} />
            ) : (
              <ClueList />
            )}
            <TeamInfo team="red" />
          </h1>
          <div className="absolute right-4 flex gap-2 ml-auto">
            <Button onClick={openMenu} circular inversed>
              <MenuIcon
                fill="currentColor"
                className="cartas"
                width={20}
                height={20}
              />
            </Button>
            <Button
              onClick={() => {
                document.documentElement.requestFullscreen();
              }}
              circular
              inversed
            >
              <FullScreenIcon
                className="cartas"
                width={20}
                height={20}
                strokeWidth={3}
              />
            </Button>
          </div>
        </header>

        <section className="mt-2 mb-2 flex justify-center">
          <GameStatus />
        </section>

        <section className="flex w-full flex-1 min-h-0">
          <div className="w-[70%] flex ml-4 mr-4 mb-4">
            <Board
              board={cards}
              handleCardClick={
                state.user.role === "leader"
                  ? manager.selectCard || (() => {})
                  : manager.revealCard || (() => {})
              }
            />
          </div>
          <aside className="flex-1 flex flex-col min-h-0 mr-4 mb-4">
            <Chat />
            {state.user.role !== "leader" && (
              <div className="mt-4 h-[15%] mt-0">
                <Button
                  id="next-turn-button"
                  onClick={() => {
                    manager.nextTurn();
                  }}
                  style="w-full h-full text-[clamp(0.5rem,2vw,2rem)] font-bold transition-transform duration-200 hover:scale-102"
                >
                  {t("pass_turn")}
                </Button>
              </div>
            )}
          </aside>
        </section>
      </main>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={t("confirm_leave_game")}
      >
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={handleConfirmExit}>{t("yes")}</Button>
          <Button onClick={() => setIsPopupOpen(false)} inversed>
            {t("no")}
          </Button>
        </div>
      </Popup>

      <Popup
        isOpen={manager.genericPopup ? manager.genericPopup.isOpen : undefined}
        onClose={() => (manager.showPopup ? manager.showPopup("") : undefined)}
        message={
          manager.genericPopup ? manager.genericPopup.message : undefined
        }
      >
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={() =>
              manager.showPopup ? manager.showPopup("") : undefined
            }
          >
            {t("close")}
          </Button>
        </div>
      </Popup>

      {showMenu && <Menu onClose={openMenu} isGame={true} />}

      <TimedPopup
        open={showEndPopup}
        message={endMessage}
        duration={3000}
        onClose={() => navigate("/lobby")}
      />
    </>
  );
}
