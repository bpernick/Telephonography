import React, { useState, useEffect, ReactElement } from 'react'
import { getOpts } from './graphqlHeaders'
import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";
import { GameRoom } from './GameRoom'
import { WaitingRoom } from './WaitingRoom'
import { GameEnd } from './GameEnd'

export const GamePage = ({ gameHash }: GamePageProps ): ReactElement => {
  const mutation = gql `
    mutation {
      playGame (id: "${gameHash}")
    }
  `

  const { data, loading, error } = useSubscription (mutation);

  console.log('data', data);

  return (
  <div>
    <>{ gameStatus === 'PENDING' && <WaitingRoom/> }</>
    <>{ gameStatus === 'STARTED' && <GameRoom/> }</>
    <>{ gameStatus === 'ENDGAME' && <GameEnd/> }</>
  </div>)
}

export interface GamePageProps {
  gameHash: string
}