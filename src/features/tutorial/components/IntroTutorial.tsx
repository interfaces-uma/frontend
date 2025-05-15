import { useTranslation } from "react-i18next";
interface IntroTutorialProps {
  onFinish: () => void;
}

function IntroTutorial({ onFinish }: IntroTutorialProps) {
  const [step, setStep] = useState(0);
  const { t } = useTranslation();

  const steps = [t("t1"), t("t2"), t("t3"), t("t4"), t("t5"), t("t6"), t("t7")];

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
              {t("previus")}
            </button>
          )}
          {!isLast ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 bg-fondo text-white rounded-xl"
            >
              {t("next")}
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="px-4 py-2 bg-fondo text-white rounded-xl"
            >
              {t("start")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

export default IntroTutorial;
