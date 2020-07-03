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
    <div className="room">
      <div/>
        <div className="main">
          <h2 className="title">What do you think this is?</h2>
          <img className="canvas" src={drawing}></img>
          <div>
            <span>What is it?</span>
            <input className="input caption_canvas_input" type="text" onChange={(e) =>{setPrompt(e.target.value)}}></input>
          </div>
          <span className="button" onClick={handleClick}>Submit</span>
        </div>
      <div/>
    </div>)
}
export interface CaptionCanvasProps {
  drawing: string,
  submitPrompt: Function,
}