import type { TutorialStep } from "@/types";
import i18next from "i18next";
const t = i18next.t;

const steps: TutorialStep[] = [
  null,
  {
    title: t("seleccion"),
    description: t("des_seleccion"),
    highlightSelector: ["#card-gato", "#card-hamster", "#card-perro"],
    expectedAction: {
      type: "selectCard",
      payload: {
        words: ["gato", "hamster", "perro"],
      },
    },
  },
  {
    title: t("give_clue"),
    description: t("give_clue_description"),
    highlightSelector: ["#input-clue"],
    expectedAction: {
      type: "giveClue",
      payload: {
        word: ["animales", "animal", "mascota", "mascotas"],
      },
    },
  },
  {
    title: t("elecction"),
    description: t("elecction_description"),
    highlightSelector: ["#card-gato", "#card-hamster", "#card-perro"],
    expectedAction: {
      type: "flipCard",
      payload: {
        words: ["gato", "hamster", "perro"],
      },
    },
  },
  {
    title: t("next_turn"),
    description: t("next_turn_description"),
    highlightSelector: ["#next-turn-button"],
    expectedAction: {
      type: "nextTurn",
    },
  },
  {
    title: t("ready"),
    description: t("ready_description"),
  },
];

export default steps;
