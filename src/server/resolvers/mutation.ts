import {randomBytes} from 'crypto'
import {
  startGameQuery,
  addDrawing,
  addPrompt,
} from '../../db/queries'
import { PubSub } from 'graphql-subscriptions'
import { getRandomPrompts } from '../randomPrompts'

const pubSub = new PubSub()
export const randomId = (): string => {
  return randomBytes(4).toString('hex')
}

export  const startGame = async (_: any, {gameHash}: any) => {
  try {
    const numberOfPlayers = await startGameQuery (gameHash);
    await pubSub.publish(`${gameHash}_GAME_STARTED`, {
      promptOptions: getRandomPrompts(numberOfPlayers)
    })
    return true;
  } catch (err) {
    console.log ('startGame query error', err)
  }
}

export  const submitDrawing = async (_: any, {drawing, playerOrder, numberOfPlayers, playerId}: any) => { 
  const nextPlayer = playerOrder % numberOfPlayers  + 1
  try {
    await addDrawing(drawing, nextPlayer, playerId)
    return true;
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const submitCaption = async (_: any, {prompt, playerOrder, numberOfPlayers, playerId}: any) => {
  try {
  const nextPlayer = playerOrder % numberOfPlayers + 1
    await addPrompt(prompt, nextPlayer, playerId)
    return true;
  } catch (err) {
    console.log ('addPrompt query error', err)
  }
}

export  const endGame = async (_: any, {id}: any) => {
  

}