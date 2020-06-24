import React, { ReactElement, useState, useEffect, useRef } from "react";

export const CaptionCanvas = ({
  drawing,
  submitPrompt,
}: CaptionCanvasProps): ReactElement => {
  const [prompt, setPrompt] = useState('');

  const handleClick = (e: React.MouseEvent) => {
    submitPrompt(prompt);
  }
  return (
    <div>
      <input type="text" onChange={(e) =>{setPrompt(e.target.value)}}></input>
      <img src={drawing}></img>
      <button onClick={handleClick}>Submit</button>
    </div>)
}
export interface CaptionCanvasProps {
  drawing: string,
  submitPrompt: Function,
}