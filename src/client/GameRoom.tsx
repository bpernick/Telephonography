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
  playerOrder,
}: GameRoomProps ): ReactElement => {
  
  const playGame = `
    subscription {
      playGame (id: "${gameHash}") {
        prompts
        id
        gameStatus
      }
    }
  `

    useEffect (() => {
      const playGameSocket = new WebSocket('ws://localhost:3000/graphql', 'graphql-ws')
      playGameSocket.onopen = (event) => {
        console.log("open", event)
        playGameSocket.send(JSON.stringify({
          type: 'connection_init'
        }));
      }
      playGameSocket.addEventListener('message', (message) => {
        const data = JSON.parse(message.data);
        console.log("message", data);

        if (data.type === 'connection_ack') {
          console.log('success');
          playGameSocket.send(JSON.stringify({
            type: 'start',
            payload: { query: playGame }
          }))
        } else if (data.type === 'data') {
          console.log('data', data);
          const res = data.payload.data.playGame;
          setPrompts(res.prompts)
          setGameStatus(res.gameStatus)
        } 
      })
    }, [])
  

  const [gameStatus, setGameStatus] = useState('PENDING');
  const [prompts, setPrompts] = useState([]);

  return (
  <div>
    <>{ gameStatus === 'PENDING' && <WaitingRoom playerOrder = { playerOrder } gameHash = {gameHash}/> }</>
    <>{ gameStatus === 'STARTED' && <GamePage/> }</>
    <>{ gameStatus === 'ENDGAME' && <GameEnd/> }</>
  </div>)
}

export interface GameRoomProps {
  gameHash: string,
  playerOrder: number,
}