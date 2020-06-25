import { pubSub } from './pubSub'
import { getAllPromptsAndDrawings } from '../../db/queries'
import { getRandomPrompts } from '../randomPrompts'
export const publishGameStart = async (gameHash: string, numberOfPlayers: number): Promise<void> => {
  await pubSub.publish(`GAME_STARTED`, { 
    playGame: {
      prompts: getRandomPrompts(numberOfPlayers), 
      gameStatus: 'STARTED',
    },
    id: gameHash
  })
}

export const publishGameEnd = async (gameHash: string): Promise<void> => {
  const promptsAndDrawings = await getAllPromptsAndDrawings(gameHash);
  const recurse = (i: number) => {
    const finalAnswers = [];
    const array = promptsAndDrawings[i].responses;
    for (let j = 0; j < array.length; j+=2) {
      finalAnswers.push ({
        prompt: array[j],
        drawing: array[j+1] || null,
      })
    }
    pubSub.publish(`GAME_STARTED`, { 
      playGame: {
        finalAnswers,
        gameStatus: 'ENDGAME',
      },
      id: gameHash
    })
    if (i < promptsAndDrawings.length - 1) {
      setTimeout((i) => {recurse(i)}, 5000, i+1);
      return;
    }
    setTimeout(() => { 
      pubSub.publish(`GAME_STARTED`, { 
        playGame: {
          gameStatus: 'FINISHED',
        },
        id: gameHash
      }) 
    }, 5000)
  }
  recurse(0);
}

export const publishNextTurn = async ({drawing, prompt, turn, nextPlayer}: INextTurnArgs): Promise<void> => {
  await pubSub.publish('NEXT_TURN', {
    nextTurn: { 
      drawing,
      prompt,
      turn,
    },
    playerId: nextPlayer,
  })
}

export interface INextTurnArgs {
  drawing?: string, 
  prompt?: string,
  turn: number, 
  nextPlayer: number
}