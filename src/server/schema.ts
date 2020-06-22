import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type NewPlayerInfo {
  playerOrder: Int
  playerUniqueId: Int
}

type NextTurn {
  drawing: String
  prompt: String 
  turn: Int
}

type FinalAnswers {
  drawings: [String]
  prompts: [String]
}
type PlayGame {
  finalAnswers: FinalAnswers
  prompts: [String]
  id: String
  gameStatus: String
}

type Query {
  drawing: String
  prompt: String
  randomId: String
  nextPlayer(playerOrder: Int, numberOfPlayers:Int, gameId: String): Int
}

type Mutation {
  joinGame (gameHash: String, name: String): NewPlayerInfo
  startGame(gameHash: String): Boolean
  drawing(drawing: String, nextPlayer: Int, playerId: Int, gameHash: String): NextTurn
  prompt(prompt: String, nextPlayer: Int, playerId: Int, gameHash: String): NextTurn
  endGame: [String]
}

type Subscription {
  playGame(id: String): PlayGame
}
`;