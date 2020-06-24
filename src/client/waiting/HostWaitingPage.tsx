import React, { ReactElement } from "react";
import { getOpts } from '../utils/graphqlHeaders'

export const HostWaitingPage = ({
  gameHash
}: HostWaitingPageProps): ReactElement => {
  const startGame = () => {
    const mutation = `
      mutation {
        startGame (gameHash: "${gameHash}")
      }
    `
    fetch('/graphql', getOpts(mutation))
  }
  return (<>
    <p>Telephonography</p>
    <p>{`Your code is ${gameHash}`}</p>
    <p>Wait for all your guests to sign in</p>
    <p>And then...</p>
    <button onClick ={ startGame }> Start Game! </button>
  </>)
};

export interface HostWaitingPageProps {
  gameHash: string
}