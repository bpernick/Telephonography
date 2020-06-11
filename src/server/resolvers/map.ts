import {getGame} from '../../../database/inMemory'
import {Game, GameState} from './types'
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const POST_ADDED = 'POST ADDED!'

export const resolvers = {
  Query: {
    game: (_: any, {id}: any): Game => {
      return getGame(id)
    },
  },
  Game: {
    gameState: (game: Game): GameState => {
      return game.gameState
    }
  },
  GameState: {
    started: (state: any): boolean => {
      return state.started
    },
    turn: (state: any): number => {
      return state.turn
    },
    numOfPlayers: (state: any): number => {
      return state.numOfPlayers
    }
  },
  Mutation: {
    newGame: (): number => {
      return Math.random() * 100
    }
  }
}