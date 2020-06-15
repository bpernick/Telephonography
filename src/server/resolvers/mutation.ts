import {
  startGameQuery,
  joinGame as joinGameQuery,
  addDrawing,
  addPrompt,
} from '../../db/queries'
import { PubSub } from 'graphql-subscriptions'
import { getRandomPrompts } from '../randomPrompts'

const pubSub = new PubSub()

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
    await pubSub.publish(`${gameHash}_GAME_STARTED`, {
      promptOptions: getRandomPrompts(numberOfPlayers)
    })
    return true;
  } catch (err) {
    console.log ('startGame query error', err)
  }
}

export  const submitDrawing = async (_: any, {drawing, nextPlayer, playerId}: any) => { 
  try {
    await addDrawing(drawing, nextPlayer, playerId)
    return true;
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const submitCaption = async (_: any, {prompt, nextPlayer, playerId}: any) => {
  try {
    await addPrompt(prompt, nextPlayer, playerId)
    return true;
  } catch (err) {
    console.log ('addPrompt query error', err)
  }
}

export  const endGame = async (_: any, {id}: any) => {
  

}