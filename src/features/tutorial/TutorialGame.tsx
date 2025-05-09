import Game from "@/features/shared/components/Game/Game";
import { useTutorialManager } from "@/features/tutorial/hooks/useTutorialManager";
import { useEffect } from "react";

const TutorialGame = () => {
  const manager = useTutorialManager();
  useEffect(() => {
    manager.setInitialState();
  }, []);

  return <Game manager={manager} />;
};

export default TutorialGame;
