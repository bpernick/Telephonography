import {
  startGameQuery,
  joinGame as joinGameQuery,
  addDrawing,
  addPrompt,
  getOrderById,
  getNumberOfPlayers,
  incrementTurn,
  decrementPlayersLeft,
  getUniqueIdFromOrder,
} from '../../db/queries'
// import { pubSub } from './pubSub'
import { publishGameStart, publishGameEnd, publishNextTurn } from './publish'
// import { getRandomPrompts } from '../randomPrompts'

export  const joinGame = async (_: any, {name, gameHash}: any) => {
  try {
    const playerInfo = await joinGameQuery(gameHash, name);
    return playerInfo;
  } catch (err) {
    console.log ('joinGame query error', err)
  }
}
export  const startGame = async (_: any, {gameHash}: any) => {
  try {
    const numberOfPlayers = await startGameQuery (gameHash);
    await publishGameStart (gameHash, numberOfPlayers);
    return true;
  } catch (err) {
    console.log ('startGame query error', err)
  }
}

export  const submitDrawing = async (_: any, { drawing, nextPlayer, playerId, gameHash }: any) => { 
  try {
    let turn = await incrementTurn(playerId, gameHash);
    const order = await getOrderById(playerId);
    const players = await getNumberOfPlayers(gameHash);
    const originOrder = ((order + (turn - 1)) % players) === 0 ? players : ((order + (turn - 1)) % players)
    console.log("originOrder", originOrder, "turn", turn, "order", order, "players", players )
    const originPlayer = await getUniqueIdFromOrder (originOrder, gameHash);
    turn = turn > players ? -1 : turn;
    
    await addDrawing(drawing, originOrder, gameHash, originPlayer);
    if (turn === -1) {
      const playersLeft = await decrementPlayersLeft(gameHash);
      playersLeft === 0 && await publishGameEnd(gameHash);
      return ({ turn })
    } else {
      await publishNextTurn({drawing, turn, nextPlayer});
      return ({ turn });
    }
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const submitCaption = async (_: any, { prompt, nextPlayer, playerId, gameHash }: any) => {
  try {
    console.log('submit prompt', prompt)
    let turn = await incrementTurn(playerId, gameHash);
    const order = await getOrderById(playerId);
    const players = await getNumberOfPlayers(gameHash);
    const originOrder = ((order + (turn - 1)) % players) === 0 ? players : ((order + (turn - 1)) % players);
    console.log("originOrder", originOrder, "turn", turn, "order", order, "players", players )
    const originPlayer = await getUniqueIdFromOrder (originOrder, gameHash);
    turn = turn > players ? -1 : turn;
    
    await addPrompt(prompt, originOrder, gameHash, originPlayer);
    if (turn === -1) {
      const playersLeft = await decrementPlayersLeft(gameHash);
      playersLeft === 0 && await publishGameEnd(gameHash);
      return ({ turn })
    } else {
      await publishNextTurn({prompt, turn, nextPlayer});
      return ({ turn }); 
    }
  } catch (err) {
    console.log ('addCaption query error', err)
  }
}

export  const endGame = async (_: any, {id}: any) => {
  
}