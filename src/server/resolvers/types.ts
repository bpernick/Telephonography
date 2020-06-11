export interface Game {
  gameState: GameState
}

export interface GameState {
  started?: boolean,
  turn?: number,
  numOfPlayers?: number
  
}