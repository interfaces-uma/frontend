import type { TutorialStep } from "@/types";

const steps: TutorialStep[] = [
  null,
  {
    title: "Selecciona las cartas relacionadas",
    description:
      "Eres el lider del equipo azul. Elige cartas relacionadas entre sí.",
    highlightSelector: ["#card-gato", "#card-hamster", "#card-perro"],
    expectedAction: {
      type: "selectCard",
      payload: {
        words: ["gato", "hamster", "perro"],
      },
    },
  },
  {
    title: "Da una palabra clave",
    description:
      "Da una pista que relacione las cartas seleccionadas para que tu equipo las adivine. Por ejemplo: 'animales o mascotas'. Asegúrate de que la pista no se relacione con ninguna carta más del tablero.",
    highlightSelector: ["#input-clue"],
    expectedAction: {
      type: "giveClue",
      payload: {
        word: ["animales", "animal", "mascota", "mascotas"],
      },
    },
  },
  {
    title: "Elección de cartas como agente",
    description:
      "Ahora estás actuando como un agente de tu equipo. Así verían el tablero tus compañeros. Elige las palabras que puedan estar relacionadas con la pista.",
    highlightSelector: ["#card-gato", "#card-hamster", "#card-perro"],
    expectedAction: {
      type: "flipCard",
      payload: {
        words: ["gato", "hamster", "perro"],
      },
    },
  },
  {
    title: "Pasa de turno",
    description:
      "Una vez elegidas las cartas, puedes pasar de turno para que juegue el equipo rival. Siempre tienes la posibilidad de elegir una carta más del tablero a parte de las definidas por tu lider",
    highlightSelector: ["#next-turn-button"],
    expectedAction: {
      type: "nextTurn",
    },
  },
  {
    title: "¡Listo para jugar!",
    description: "Ahora puedes jugar con tus amigos. ¡Buena suerte!",
  },
];

export default steps;
