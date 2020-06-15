import {gamePlaySubscription} from './subscription'
import { 
  randomId,
  startGame,
  submitDrawing,
  submitCaption,
  endGame,
} from './mutation';
import { 
  prompt,
  drawing
} from './query';

export const resolvers = {
  Subscription: {
    //how do I pass down the variables?
    playGame: {
      subscribe: gamePlaySubscription,
    }
  },
  Query: {
    prompt,
    drawing,
  },
  Mutation: {
    randomId,
    startGame,
    drawing: submitDrawing,
    prompt: submitCaption,
    endGame,
  }
}