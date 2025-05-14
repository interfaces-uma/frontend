interface IntroTutorialProps {
  onFinish: () => void;
}

function IntroTutorial({ onFinish }: IntroTutorialProps) {
  const [step, setStep] = useState(0);

  const steps = [
    "¡Bienvenido! Este es el tutorial de El Código Secreto.",
    "Dos equipos compiten por descubrir todas sus palabras antes que el rival.",
    "Cada carta del tablero tiene una palabra. Algunas pertenecen a tu equipo, otras al rival...",
    "Tu líder conoce la identidad de todas las cartas. Él dará una pista para ayudarte.",
    "Los agentes deben adivinar qué palabras son las de su equipo basándose en la pista.",
    "Pero cuidado: si eliges la carta negra, ¡pierdes la partida al instante!",
    "Vamos a empezar. Te guiaremos paso a paso en una partida ficticia.",
  ];

  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center">
      <div className="w-[50%] h-[50%]  flex flex-col items-center justify-center bg-cartas p-6 rounded-2xl shadow-xl max-w-xl mx-auto">
        <p className="text-center mb-4">{steps[step]}</p>
        <div className="flex gap-4 mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 bg-gray-300 border-fondo border-2 rounded-xl"
            >
              Anterior
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 bg-fondo text-white rounded-xl"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="px-4 py-2 bg-fondo text-white rounded-xl"
            >
              Empezar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default IntroTutorial;
