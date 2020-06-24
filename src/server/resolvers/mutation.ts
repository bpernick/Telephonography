import {
  startGameQuery,
  joinGame as joinGameQuery,
  addDrawing,
  addPrompt,
  getNextDrawing,
  getNextPrompt,
  incrementTurn,
  decrementPlayersLeft,
  getAllPromptsAndDrawings,
} from '../../db/queries'
import { pubSub } from './pubSub'
import { getRandomPrompts } from '../randomPrompts'

export  const joinGame = async (_: any, {name, gameHash}: any) => {
  console.log ('joingame', name, gameHash )
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
    await pubSub.publish(`GAME_STARTED`, { 
      playGame: {
        prompts: getRandomPrompts(numberOfPlayers), 
        id: gameHash, 
        gameStatus: 'STARTED',
      },
      id: gameHash
    })
    return true;
  } catch (err) {
    console.log ('startGame query error', err)
  }
}

export  const submitDrawing = async (_: any, { drawing, nextPlayer, playerId, gameHash }: any) => { 
  try {
    await addDrawing(drawing, playerId);
    const turn = await incrementTurn(playerId, gameHash);
    if (turn === -1) {
      const playersLeft = await decrementPlayersLeft(gameHash);
      playersLeft === 0 && await pubSub.publish(`GAME_STARTED`, { 
        playGame: {
          finalAnswers: await getAllPromptsAndDrawings(gameHash),
          id: gameHash, 
          gameStatus: 'ENDGAME',
        },
      })
      return ({ turn })
    } else {
      await pubSub.publish('NEXT_TURN', {
        nextTurn: { 
          drawing,
          turn,
         },
        playerId: nextPlayer,
      })
      return ({ turn });
    }
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const submitCaption = async (_: any, { prompt, nextPlayer, playerId, gameHash }: any) => {
  try {
    await addPrompt(prompt, playerId);
    const turn = await incrementTurn(playerId, gameHash);
    if (turn === -1) {
      const playersLeft = await decrementPlayersLeft(gameHash);
      playersLeft === 0 && await pubSub.publish(`GAME_STARTED`, { 
        playGame: {
          finalAnswers: await getAllPromptsAndDrawings(gameHash),
          id: gameHash, 
          gameStatus: 'ENDGAME',
        },
      })
      return ({ turn })
    } else {
      await pubSub.publish('NEXT_TURN', {
        nextTurn: { 
          prompt,
          turn,
         },
        playerId: nextPlayer,
      })
      return ({ turn }); 
    }
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const endGame = async (_: any, {id}: any) => {
  
}