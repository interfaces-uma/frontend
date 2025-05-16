import type { TutorialStep } from "@/types";
import i18next from "i18next";
const t = i18next.t;

const steps: TutorialStep[] = [
  null,
  {
    title: t("seleccion"),
    description: t("des_seleccion"),
    highlightSelector: [
      `#card-${t("gato")}`,
      `#card-${t("hamster")}`,
      `#card-${t("perro")}`,
    ],

    expectedAction: {
      type: "selectCard",
      payload: {
        words: [t("gato"), t("hamster"), t("perro")],
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
        word: [t("animales"), t("animal"), t("mascota"), t("mascotas")],
      },
    },
  },
  {
    title: t("elecction"),
    description: t("elecction_description"),
    highlightSelector: [
      `#card-${t("gato")}`,
      `#card-${t("hamster")}`,
      `#card-${t("perro")}`,
    ],

    expectedAction: {
      type: "flipCard",
      payload: {
        words: [t("gato"), t("hamster"), t("perro")],
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
