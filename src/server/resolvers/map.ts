import {
  gamePlaySubscription,
  nextTurnSubscription,
} from './subscription'
import { 
  joinGame,
  startGame,
  submitDrawing,
  submitCaption,
  endGame,
} from './mutation';
import { 
  randomId,
  prompt,
  drawing,
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
    prompt,
    drawing,
    nextPlayer,
  },
  Mutation: {
    joinGame,
    startGame,
    drawing: submitDrawing,
    prompt: submitCaption,
    endGame,
  }
}