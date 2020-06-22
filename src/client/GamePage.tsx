import React, { ReactElement, useState } from "react";
import { getOpts } from './graphqlHeaders'
import { DrawingCanvas } from './DrawingCanvas'
import { ChooseInitialCaption } from './ChooseInitialCaption'
import { CaptionCanvas } from './CaptionCanvas'
import { WaitForGameEnd } from './WaitForGameEnd'
export const GamePage = ({
  gameHash,
  playerId,
  nextPlayer,
  prompts,
}: GamePageProps ): ReactElement => {

  const [turn, setTurn] = useState(0);
  const [nextPrompt, setNextPrompt] = useState('');
  const [nextDrawing, setNextDrawing] = useState('');
  // const [base64data, setBase64data] = useState('');
  // const [prompt, setPrompt] = useState('');


  const submitDrawing = (base64data: string) => {
    const drawingMutation = `
      mutation {
        drawing (drawing: "${base64data}", playerId: ${playerId}, nextPlayer: ${nextPlayer}, gameHash: "${gameHash}") {
          prompt
          turn
        }
      }
    `;
    fetch ('/graphql', getOpts(drawingMutation))
      .then(r => r.json())
      .then(({ data }) => {
        data.prompt && setNextPrompt(data.prompt);
        setTurn(data.turn)
      })
  }

  const submitPrompt = (promptData: string) => {
    const promptMutation = `
      mutation {
        prompt (prompt: "${promptData}", playerId: ${playerId}, nextPlayer: ${nextPlayer}, gameHash: "${gameHash}") {
          drawing
          turn
        }
      }
    `;
    fetch ('/graphql', getOpts(promptMutation))
      .then(r => r.json())
      .then(({ data }) => {
        data.drawing && setNextDrawing(data.drawing);
        setTurn(data.turn)
      })
  }
  return (
    <>
      <>{ turn === -1 && <WaitForGameEnd/> }</>
      <>{ !turn && <ChooseInitialCaption submitPrompt = { submitPrompt } prompts = { prompts }/> }</>
      <>{ (turn % 2 !== 0) && <DrawingCanvas prompt = { nextPrompt } submitDrawing = { submitDrawing }/> }</>
      <>{ (turn > 0 && (turn % 2 === 0)) && <CaptionCanvas drawing = { nextDrawing } submitPrompt = { submitPrompt }/> }</>
    </>
    )
};

export interface GamePageProps {
  gameHash: string,
  playerId: number,
  nextPlayer: number,
  prompts: string[],
}