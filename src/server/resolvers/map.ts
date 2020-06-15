import {gamePlaySubscription} from './subscription'
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
    //how do I pass down the variables?
    playGame: {
      subscribe: gamePlaySubscription,
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