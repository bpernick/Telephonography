import React, { ReactElement } from "react";
import { HostWaitingPage } from "./HostWaitingPage";
import { Waiting } from "./Waiting";


export const WaitingRoom = ({
  playerOrder,
  gameHash,
}: WaitingRoomProps): ReactElement => {
  return (<div>{ playerOrder === 1 ? <HostWaitingPage gameHash = {gameHash} /> : <Waiting godot = "your host to start the game"/> }</div>)
};

export interface WaitingRoomProps {
  playerOrder: number,
  gameHash: string,
}