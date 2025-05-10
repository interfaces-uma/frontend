import Game from "@/features/shared/components/Game/Game";
import { useTutorialManager } from "@/features/tutorial/hooks/useTutorialManager";
import { useEffect, useState } from "react";
import IntroTutorial from "./components/IntroTutorial";
import TutorialPopup from "./components/TutorialPopup";
import { useNavigate } from "react-router";

const TutorialGame = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const manager = useTutorialManager();

  useEffect(() => {
    manager.setInitialState();
  }, []);

  useEffect(() => {
    if (!manager.currentStep) return;
    setShowTutorial(true);

    let elements: Element[] = [];
    if (manager.currentStep.highlightSelector) {
      elements = Array.from(
        document.querySelectorAll(
          manager.currentStep.highlightSelector.join(","),
        ),
      );
      for (const element of elements) {
        element.classList.add("border-5", "border-yellow-500", "animate-pulse");
      }
    }

    // Cleanup: elimina las clases cuando el step cambia o el componente se desmonta
    return () => {
      setShowTutorial(false);
      for (const element of elements) {
        element.classList.remove(
          "border-5",
          "border-yellow-500",
          "animate-pulse",
        );
      }
    };
  }, [manager.currentStep]);

  const handleFinish = () => {
    setShowIntro(false);
    manager.goNextStep();
  };

  const navigate = useNavigate();

  return (
    <div>
      {showIntro && <IntroTutorial onFinish={handleFinish} />}
      {showTutorial && (
        <TutorialPopup
          title={manager.currentStep?.title ?? ""}
          message={manager.currentStep?.description ?? ""}
          isOpen={showTutorial}
          acceptText={manager.isLastStep() ? "Volver al menu" : "Aceptar"}
          onAccept={() => {
            if (manager.isLastStep()) {
              navigate("/");
            } else {
              setShowTutorial(false);
            }
          }}
        />
      )}
      {/* <button type="button" onClick={() => manager.goNextStep()}>
        Siguiente
      </button> */}
      <Game manager={manager} />
    </div>
  );
};

export default TutorialGame;
