import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type GameState {
  started: Boolean
  turn: Int
  numOfPlayers: Int
}
type Game {
  gameState: GameState
}
type Comment {
  id: String
  text: String
}
type Mutation {
  randomId: String
  startGame: [String]
  drawing: String
  caption: String
  endGame
}
type Subscription {
  playGame(id: string): [String]
}
`;