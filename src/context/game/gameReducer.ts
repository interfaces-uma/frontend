import type { GameState, DispatchActions } from "@/types/game";

export function gameReducer(
  state: GameState,
  action: DispatchActions,
): GameState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TEAM": {
      const { user, team, role } = action;

      const updatedPlayers = state.players.filter((p) => p.id !== user.id);
      const updatedRedTeam = { ...state.teams.red };
      const updatedBlueTeam = { ...state.teams.blue };

      if (state.teams.red.leader.id === user.id) {
        updatedRedTeam.leader = {
          id: "",
          name: "",
          color: "red",
          role: "leader",
        };
      } else {
        updatedRedTeam.agents = state.teams.red.agents.filter(
          (p) => p.id !== user.id,
        );
      }

      if (state.teams.blue.leader.id === user.id) {
        updatedBlueTeam.leader = {
          id: "",
          name: "",
          color: "blue",
          role: "leader",
        };
      } else {
        updatedBlueTeam.agents = state.teams.blue.agents.filter(
          (p) => p.id !== user.id,
        );
      }

      if (team === "red") {
        if (role === "leader") {
          updatedRedTeam.leader = user;
        } else {
          updatedRedTeam.agents.push(user);
        }
      } else if (team === "blue") {
        if (role === "leader") {
          updatedBlueTeam.leader = user;
        } else {
          updatedBlueTeam.agents.push(user);
        }
      }

      const updatedUser = { ...user, role, color: team };

      return {
        ...state,
        players: updatedPlayers,
        teams: {
          red: updatedRedTeam,
          blue: updatedBlueTeam,
        },
        user: updatedUser,
      };
    }
    case "SET_STATE":
      return action.state;

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

    case "SELECT_CARD":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.word === action.cardText) {
            return { ...card, isSelected: !card.isSelected };
          }
          return card;
        }),
      };
    case "NEXT_TURN": {
      const currentRole = state.turn.role;
      const changeColor = currentRole !== "leader";

      if (changeColor) {
        return {
          ...state,
          turn: {
            team: state.turn.team === "red" ? "blue" : "red",
            role: state.turn.role === "leader" ? "agent" : "leader",
          },
        };
      }

      // no hay cambio de color, solo de rol
      return {
        ...state,
        turn: {
          team: state.turn.team,
          role: state.turn.role === "leader" ? "agent" : "leader",
        },
      };
    }
    case "END_GAME":
      return state;

    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.message],
      };

    default:
      return state;
  }
}
