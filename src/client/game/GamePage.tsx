import React, { ReactElement, useState, useEffect } from "react";
import { getOpts } from '../utils/graphqlHeaders'
import { DrawingCanvas } from './DrawingCanvas'
import { ChooseInitialCaption } from './ChooseInitialCaption'
import { CaptionCanvas } from './CaptionCanvas'
import { Waiting } from '../waitingRooms/Waiting'

export const GamePage = ({
  gameHash,
  playerId,
  nextPlayer,
  prompts,
}: GamePageProps ): ReactElement => {

  const [turn, setTurn] = useState(0);
  const [nextTurn, setNextTurn] = useState(-2);
  const [nextPrompt, setNextPrompt] = useState('');
  const [nextDrawing, setNextDrawing] = useState('');

  useEffect(() => {
    
  });

  const submitDrawing = (base64data: string) => {
    const drawingMutation = `
      mutation {
        drawing (drawing: "${base64data}", playerId: ${playerId}, nextPlayer: ${nextPlayer}, gameHash: "${gameHash}") {
          turn
        }
      }
    `;
    fetch ('/graphql', getOpts(drawingMutation))
      .then(r => r.json())
      .then(({ data }) => {
        setTurn(data.drawing.turn)
      })
  }

  const submitPrompt = (promptData: string) => {
    console.log(promptData)
    const promptMutation = `
      mutation {
        prompt (prompt: "${promptData}", playerId: ${playerId}, nextPlayer: ${nextPlayer}, gameHash: "${gameHash}"){
          turn
        }
      }
    `;
    fetch ('/graphql', getOpts(promptMutation))
      .then(r => r.json())
      .then(({ data }) => {
        setTurn(data.prompt.turn)
      })
  }

  useEffect (() => {

    const nextTurnQuery = `
      subscription {
        nextTurn (playerId: ${ playerId }) {
          prompt
          drawing
          turn
        }
      }
    `
    const nexTurnSocket = new WebSocket('ws://localhost:3000/graphql', 'graphql-ws')
    nexTurnSocket.onopen = (event) => {
      console.log("open", event)
      nexTurnSocket.send(JSON.stringify({ type: 'connection_init' }));
    }
    nexTurnSocket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      console.log("message", data);

      switch (data.type) {
        case 'connection_ack': {
          console.log('success');
          nexTurnSocket.send(JSON.stringify({
            type: 'start',
            payload: { query: nextTurnQuery },
          }));
          break;
        }

        case 'connection_error': {
          console.error(data.payload)
          break;
        }

        case 'ka': {
          break;
        }

        case 'data': {
          console.log('data', data);
          const result = data.payload.data.nextTurn;
          console.log('drawing from server', result.drawing)
          result.prompt && setNextPrompt(result.prompt);
          result.drawing && setNextDrawing(result.drawing);
          setNextTurn(result.turn);
          break;
        }

        case 'complete': {
          console.log('completed', data)
          break;
        }
      }
    })
    // return () => {
    //   nexTurnSocket.send(JSON.stringify({
    //     type: 'connection_terminate'
    //   }))
    //   nexTurnSocket.close()
    // }
  }, [])
  const chooseComponent = (): ReactElement => {
    if (turn === -1) {
      return(<Waiting godot = "your friends to finish the game"/>)
    } else if (turn === 0) {
      return (<ChooseInitialCaption submitPrompt = { submitPrompt } prompts = { prompts }/>)
    } else if (turn > nextTurn) {
      return(<Waiting godot = "your friend to submit an anwer"/> )
    } else if (turn % 2 !== 0) {
      return (<DrawingCanvas prompt = { nextPrompt } submitDrawing = { submitDrawing }/>)
    } else {
      return (<CaptionCanvas drawing = { nextDrawing } submitPrompt = { submitPrompt }/>)
    }
  }
  return (<>{chooseComponent()}</>)
};

export interface GamePageProps {
  gameHash: string,
  playerId: number,
  nextPlayer: number,
  prompts: string[],
}