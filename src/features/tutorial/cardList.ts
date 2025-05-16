import type { Card } from "@/types";
import i18next from "i18next";
const t = i18next.t;

const tutorialCards: Card[] = [
  { word: t("júpiter"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("sopa"), color: "red", isSelected: false, isFlipped: false },
  { word: t("marte"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("fantasma"), color: "black", isSelected: false, isFlipped: false },
  { word: t("violín"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("arma"), color: "red", isSelected: false, isFlipped: false },
  { word: t("macarrones"), color: "red", isSelected: false, isFlipped: false },
  { word: t("reloj"), color: "empty", isSelected: false, isFlipped: false },
  { word: t("hamster"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("piano"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("trompeta"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("bomba"), color: "red", isSelected: false, isFlipped: false },
  { word: t("perro"), color: "blue", isSelected: false, isFlipped: false },
  {
    word: t("telescopio"),
    color: "empty",
    isSelected: false,
    isFlipped: false,
  },
  { word: t("pizza"), color: "red", isSelected: false, isFlipped: false },
  { word: t("libro"), color: "empty", isSelected: false, isFlipped: false },
  { word: t("venus"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("gato"), color: "blue", isSelected: false, isFlipped: false },
  { word: t("helicóptero"), color: "red", isSelected: false, isFlipped: false },
  { word: t("moto"), color: "red", isSelected: false, isFlipped: false },
  { word: t("ladrillo"), color: "empty", isSelected: false, isFlipped: false },
  { word: t("pluma"), color: "empty", isSelected: false, isFlipped: false },
  { word: t("misil"), color: "red", isSelected: false, isFlipped: false },
  { word: t("montaña"), color: "empty", isSelected: false, isFlipped: false },
  { word: t("tenedor"), color: "empty", isSelected: false, isFlipped: false },
];

export default tutorialCards;
