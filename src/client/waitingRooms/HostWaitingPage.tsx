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
  return (<div className="room">
    <div/>
    <div className="main">
      <h2 className="title">Telephonography</h2>
      <p>{`Your code is ${gameHash}`}</p>
      <p>Wait for all your guests to sign in</p>
      <p className="before-button">And then...</p>
      <span className="button" onClick ={ startGame }> Start Game! </span>
    </div>
    <div/>
  </div>)
};

export interface HostWaitingPageProps {
  gameHash: string
}