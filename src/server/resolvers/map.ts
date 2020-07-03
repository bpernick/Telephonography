import {
  gamePlaySubscription,
  nextTurnSubscription,
} from './subscription'
import { 
  joinGame,
  startGame,
  submitDrawing,
  submitCaption,
  resetGame,
} from './mutation';
import { 
  randomId,
  nextPlayer,
} from './query';

export const resolvers = {
  Subscription: {
    playGame: {
      subscribe: gamePlaySubscription,
    },
    nextTurn: {
      subscribe: nextTurnSubscription,
    }
  },
  Query: {
    randomId,
    nextPlayer,
  },
  Mutation: {
    joinGame,
    startGame,
    drawing: submitDrawing,
    prompt: submitCaption,
    resetGame,
  }
}