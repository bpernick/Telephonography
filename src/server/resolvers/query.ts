import {
  getUniqueIdFromOrder,
  getNumberOfPlayers,
} from '../../db/queries'
import { randomBytes } from 'crypto'

export const randomId = (): string => {
  return randomBytes(4).toString('hex')
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