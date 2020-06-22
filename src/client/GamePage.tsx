import React, { ReactElement } from "react";
import { DrawingCanvas } from './DrawingCanvas'
import { ChooseInitialCaption } from './ChooseInitialCaption'
import { CaptionCanvas } from './CaptionCanvas'
export const GamePage = ({
  id,
  nextPlayer,
  playerOrder,
  prompts,
  firstTurn = true,
}: GamePageProps ): ReactElement => {
  return (<>{}</>
};

export interface GamePageProps {
  id: number,
  nextPlayer: number,
  playerOrder: number,
  prompts: string[],
  firstTurn: boolean,
}