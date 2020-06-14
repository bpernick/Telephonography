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
  game(id: Int): Game
}
type Mutation {
  newGame: Float
  randomId: String
}
type Subscription {
  commentAdded(repoFullName: String!): Comment
}
`;