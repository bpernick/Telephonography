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
      await addDrawing(drawing, nextPlayer, playerId);
      const prompt = await getNextPrompt (playerId);
      return ({
        prompt,
        turn,
      });
    }
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const submitCaption = async (_: any, { prompt, nextPlayer, playerId, gameHash }: any) => {
  try {
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
      await addPrompt(prompt, nextPlayer, playerId);
      const drawing = await getNextDrawing (playerId);
      const newPrompt = await getNextPrompt (playerId);
      return ({
        prompt: newPrompt,
        drawing,
        turn,
      });
    }
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const endGame = async (_: any, {id}: any) => {
  
}