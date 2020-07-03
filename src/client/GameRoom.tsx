import React, { useState, useEffect, ReactElement } from 'react'
import { getOpts } from './utils/graphqlHeaders'
import { GamePage } from './game/GamePage'
import { WaitingRoom } from './waitingRooms/WaitingRoom'
import { GameEnd } from './gameEnd/GameEnd'
import { PlayAgain } from './gameEnd/PlayAgain'

export const GameRoom = ({ 
  gameHash,
  playerId,
  playerOrder,
}: GameRoomProps ): ReactElement => {

  const [nextPlayer, setNextPlayer] = useState(-1);
  const [gameStatus, setGameStatus] = useState('PENDING');
  const [prompts, setPrompts] = useState([]);
  const [finalAnswers, setFinalAnswers] = useState([]);

  const newGameClickHandler = (): void => {
    const newGameMutation = `
    mutation {
      resetGame (id: "${gameHash}")
    }
    `
    setGameStatus('PENDING');
    fetch('/graphql', getOpts(newGameMutation))
      .then(() => { console.log('success') })
  }
  const playGameQuery = `
    subscription {
      playGame (id: "${gameHash}") {
        finalAnswers {
          drawing
          prompt
        }
        id
        gameStatus
        prompts
      }
    }
  `
  const nextPlayerQuery = `
    query {
      nextPlayer (playerOrder: ${playerOrder}, gameId: "${gameHash}")
    }`
  
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
          console.log("live from the game room")
          break;
        }

        case 'data': {
          fetch('/graphql', getOpts(nextPlayerQuery))
            .then(data => data.json())
            .then (({ data }) => {
              console.log('next', data.nextPlayer)
              setNextPlayer(data.nextPlayer)
            })
          
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
    // return () => {
    //   playGameSocket.send(JSON.stringify({
    //     type: 'connection_terminate'
    //   }))
    //   playGameSocket.close()
    // }
  }, [])

  return (
  <div>
    <>{ gameStatus === 'PENDING' && <WaitingRoom playerOrder = { playerOrder } gameHash = {gameHash}/> }</>
    <>{ gameStatus === 'STARTED' && <GamePage prompts = { prompts } gameHash = { gameHash } playerId = { playerId } nextPlayer = { nextPlayer } /> }</>
    <>{ gameStatus === 'ENDGAME' && <GameEnd finalAnswers = { finalAnswers }/> }</>
    <>{ gameStatus === 'FINISHED' && <PlayAgain handleClick = {newGameClickHandler}/>}</>
  </div>)
}

export interface GameRoomProps {
  gameHash: string,
  playerId: number,
  playerOrder: number,
}