import { useEffect } from "react";

interface TimedPopupProps {
  open: boolean;
  message: string;
  duration: number; // en milisegundos
  onClose: () => void;
}

/**
 * Muestra un popup con un mensaje durante un tiempo definido y luego ejecuta una función.
 */
const TimedPopup = ({ open, message, duration, onClose }: TimedPopupProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-cartas p-6 rounded shadow-lg max-w-sm w-full text-center">
        <p className="mb-0 mt-0 text-2xl">{message}</p>
      </div>
    </div>
  );
};

export default TimedPopup;
