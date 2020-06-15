import {
  getNextDrawing,
  getNextPrompt
} from '../../db/queries'

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