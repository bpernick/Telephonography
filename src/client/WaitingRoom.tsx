import React, { ReactElement } from "react";
import { HostWaitingPage } from "./HostWaitingPage";
import { GuestWaitingPage } from "./GuestWaitingPage";


export const WaitingRoom = ({
  playerOrder,
  gameHash,
}: WaitingRoomProps): ReactElement => {
  return (<>{ playerOrder === 1 ? <HostWaitingPage gameHash = {gameHash} /> : <GuestWaitingPage/> }</>)
};

export interface WaitingRoomProps {
  playerOrder: number,
  gameHash: string,
}