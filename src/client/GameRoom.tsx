import React, { useState, useEffect, ReactElement } from 'react'
import { getOpts } from './graphqlHeaders'
import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";
import { GamePage } from './GamePage'
import { WaitingRoom } from './WaitingRoom'
import { GameEnd } from './GameEnd'

// const GQL = {
//   CONNECTION_INIT: 'connection_init',
//   CONNECTION_ACK: 'connection_ack',
//   CONNECTION_ERROR: 'connection_error',
//   CONNECTION_KEEP_ALIVE: 'ka',
//   START: 'start',
//   STOP: 'stop',
//   CONNECTION_TERMINATE: 'connection_terminate',
//   DATA: 'data',
//   ERROR: 'error',
//   COMPLETE: 'complete'
// }

export const GameRoom = ({ 
  gameHash,
  playerId,
  playerOrder,
  nextPlayer,
}: GameRoomProps ): ReactElement => {
  
  const playGameQuery = `
    subscription {
      playGame (id: "${gameHash}") {
        finalAnswers {
          drawings
          prompts
        }
        id
        gameStatus
        prompts
      }
    }
  `
  const pickPrompts = (prompts: string[]): string[] => {
    const index = (playerOrder - 1) * 6;
    return prompts.slice(index, index + 6)
  }

  useEffect (() => {
    const playGameSocket = new WebSocket('ws://localhost:3000/graphql', 'graphql-ws')
    playGameSocket.onopen = (event) => {
      console.log("open", event)
      playGameSocket.send(JSON.stringify({ type: 'connection_init' }));
    }
    playGameSocket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      console.log("message", data);

      switch (data.type) {
        case 'connection_ack': {
          console.log('success');
          playGameSocket.send(JSON.stringify({
            type: 'start',
            payload: { query: playGameQuery },
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
          const playGame = data.payload.data.playGame;
          playGame.prompts && setPrompts(pickPrompts(playGame.prompts));
          playGame.finalAnswers && setFinalAnswers(playGame.finalAnswers);
          setGameStatus(playGame.gameStatus)
          break;
        }
        case 'complete': {
          console.log('completed', data)
          break;
        }
      }
    })
  }, [])
  

  const [gameStatus, setGameStatus] = useState('PENDING');
  const [prompts, setPrompts] = useState([]);
  const [finalAnswers, setFinalAnswers] = useState({
    drawings: [],
    prompts:[],
  })

  return (
  <div>
    <>{ gameStatus === 'PENDING' && <WaitingRoom playerOrder = { playerOrder } gameHash = {gameHash}/> }</>
    <>{ gameStatus === 'STARTED' && <GamePage prompts = { prompts } gameHash = { gameHash } playerId = { playerId } nextPlayer = { nextPlayer } /> }</>
    <>{ gameStatus === 'ENDGAME' && <GameEnd/> }</>
  </div>)
}

export interface GameRoomProps {
  gameHash: string,
  playerId: number,
  playerOrder: number,
  nextPlayer: number,
}