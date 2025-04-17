import type { GameState, DispatchActions } from "@/types/game";

export function gameReducer(
  state: GameState,
  action: DispatchActions,
): GameState {
  switch (action.type) {
    case "UPDATE_STATE":
      return action.state;
    case "START_GAME":
      return {
        ...state,
        players: action.players,
      };
    case "SET_TEAM":
      return state;

    case "SET_ROLE":
      return state;

    case "SET_CLUE":
      return { ...state, clue: { word: action.word, count: action.count } };

    case "REVEAL_CARD":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.word === action.cardText) {
            return { ...card, isFlipped: true };
          }
          return card;
        }),
      };

    case "SEND_MESSAGE":
      return state;

    case "NEXT_TURN":
      return state;

    case "END_GAME":
      return state;

    default:
      return state;
  }
}
