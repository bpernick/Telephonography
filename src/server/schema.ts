import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type NewPlayerInfo {
  playerOrder: Int
  playerUniqueId: Int
}
type Query {
  drawing: String
  prompt: String
  randomId: String
  nextPlayer(playerOrder: Int, numberOfPlayers:Int, gameId: String): Int
}
type Mutation {
  joinGame (gameHash: String, name: String): NewPlayerInfo
  startGame(gameHash: String): [String]
  drawing(drawing: String, nextPlayer: Int, playerId: String): Boolean
  prompt(prompt: String, nextPlayer: Int, playerId: String): Boolean
  endGame: [String]
}
type Subscription {
  playGame(id: String): [String]
}
`;