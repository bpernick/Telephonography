import {
  getNextDrawing,
  getNextPrompt,
  getUniqueIdFromOrder,
  getNumberOfPlayers,
} from '../../db/queries'
import { randomBytes } from 'crypto'

export const randomId = (): string => {
  return randomBytes(4).toString('hex')
}

export const prompt = async (playerOrder: number): Promise<string|null> => {
  try {
    const prompt = await getNextPrompt(playerOrder);
    //will be null if previous player has not yet submitted
    return prompt;
  } catch (err) {
    console.log('prompt query error', err)
  }
}

export const drawing = async (playerOrder: number): Promise<string|null> => {
  try {
    const drawing = await getNextDrawing(playerOrder);
    //will be null if previous player has not yet submitted
    return drawing;
  } catch (err) {
    console.log('drawing query error', err)
  }
}

export const nextPlayer = async (_:any, {playerOrder, gameId}: any): Promise<number> => {
  try {
    const numberOfPlayers = await getNumberOfPlayers(gameId)
    const next = playerOrder % numberOfPlayers  + 1;
    console.log(next)
    const playerId = await getUniqueIdFromOrder(next, gameId);
    return playerId;
  } catch (err) {
    console.log('next player query error', err)
  }
}