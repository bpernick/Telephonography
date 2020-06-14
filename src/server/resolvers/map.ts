import {getGame} from '../../../database/inMemory'
import {Game, GameState} from './types'
import {gamePlaySubscription} from './subscription'

import { 
  randomId,
  startGame,
  submitDrawing,
  submitCaption,
  endGame,
} from './mutation';

export const resolvers = {
  Subscription: {
    playGame: {
      subscribe: gamePlaySubscription,
    }
  },
  Mutation: {
    randomId,
    startGame,
    drawing: submitDrawing,
    caption: submitCaption,
    endGame,
  }
}