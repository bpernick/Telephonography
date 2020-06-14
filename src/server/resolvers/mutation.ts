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

export  const startGame = async (_: any, {id}: any) => {
  try {
    const numberOfPlayers = await startGameQuery (id)
    await pubSub.publish('GAME_STARTED', {promptOptions: getRandomPrompts(numberOfPlayers)})
    //publish game started event
  } catch (err) {
    console.log ('startGame query error', err)
  }
}

export  const submitDrawing = async (_: any, {drawing}: any) => {
  try {
    await addDrawing(drawing)
    //publish game started event
  } catch (err) {
    console.log ('addDrawing query error', err)
  }
}

export  const submitCaption = async (_: any, {prompt}: any) => {
  try {
    await addPrompt(prompt)
    //publish game started event
  } catch (err) {
    console.log ('addPrompt query error', err)
  }
}

export  const endGame = async (_: any, {id}: any) => {

}