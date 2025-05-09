import Button from "@/features/shared/components/Button";

interface TutorialPopupProps {
  title: string;
  message: string;
  onAccept: () => void;
  isOpen: boolean;
  acceptText?: string;
}

const TutorialPopup = ({
  title,
  message,
  acceptText = "Aceptar",
  onAccept,
  isOpen,
}: TutorialPopupProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      <div className="bg-cartas rounded-lg shadow-lg p-6 max-w-md w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center text-fondoRojo">
          {title}
        </h2>
        <p className="mb-4 text-center text-lg">{message}</p>
        <Button
          onClick={onAccept}
          style="w-full text-lg font-semibold bg-fondo text-cartas"
        >
          {acceptText}
        </Button>
      </div>
    </div>
  );
};

export default TutorialPopup;
