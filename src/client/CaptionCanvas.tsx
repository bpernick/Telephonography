import React, { ReactElement } from "react";

export const CaptionCanvas = ({
  drawing,
  submitPrompt,
}: CaptionCanvasProps): ReactElement => {
  return (<div>{"CaptionCanvas"}</div>)
}

export interface CaptionCanvasProps {
  drawing: string,
  submitPrompt: Function,
}