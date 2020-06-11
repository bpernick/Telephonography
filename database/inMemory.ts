const data:any  = {
  3124: {
    gameState: {
      started: true,
      turn: 2,
      numOfPlayers: 3,
    }
  }
};

export const getGame = (id: number) => {
  return data[id];
}