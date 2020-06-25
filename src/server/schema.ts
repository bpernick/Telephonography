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
  drawing: String
  prompt: String
}

type PlayGame {
  finalAnswers: [FinalAnswers]
  prompts: [String]
  id: String
  gameStatus: String
}

type Turn {
  turn: Int
}

type Query {
  randomId: String
  nextPlayer(playerOrder: Int, gameId: String): Int
}

type Mutation {
  joinGame (gameHash: String, name: String): NewPlayerInfo
  startGame (gameHash: String): Boolean
  drawing (drawing: String, nextPlayer: Int, playerId: Int, gameHash: String): Turn
  prompt (prompt: String, nextPlayer: Int, playerId: Int, gameHash: String): Turn
  endGame: [String]
}

type Subscription {
  playGame(id: String): PlayGame
  nextTurn(playerId: Int): NextTurn
}
`;