import { useEffect, useState } from "react";

function Timer({ duration }: { duration: number }) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) {
      setTime(0);
    } else {
      setTimeout(() => {
        setTime(time - 1000);
      }, 1000);
    }
  }, [time]);

  const getFormattedTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    // Formatea los minutos y segundos para que siempre tengan dos dígitos
    //const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  };
  // Calcula el progreso del círculo
  const radius = 50; // Radio del círculo
  const circumference = 2 * Math.PI * radius; // Circunferencia del círculo
  const progress = (time / duration) * circumference; // Progreso basado en el tiempo restante

  return (
    <div className="relative flex items-center justify-center">
      <svg width="120" height="120" className="transform -rotate-90">
        {/* Fondo del círculo (negro) */}
        <title>timer</title>
        <circle cx="60" cy="60" r={radius} stroke="black" strokeWidth="10" />
        {/* Progreso del círculo (gris) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="gray"
          strokeWidth="13"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
      </svg>
      {/* Tiempo restante en el centro (blanco) */}
      <div className="absolute flex items-center justify-center text-3xl font-bold text-white">
        {getFormattedTime(time)}
      </div>
    </div>
  );
}
export default Timer;
