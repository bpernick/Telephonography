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
type Query {
  drawing: String
  caption: String
}
type Mutation {
  randomId: String
  startGame: [String]
  drawing(String): Boolean
  caption(String): Boolean
  endGame: [String]
}
type Subscription {
  playGame(id: string): [String]
}
`;