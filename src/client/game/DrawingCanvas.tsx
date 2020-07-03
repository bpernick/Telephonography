import React, {useRef, useEffect, ReactElement, MouseEventHandler} from 'react'

export const DrawingCanvas = ({
  prompt,
  submitDrawing,
}:DrawingCanvasProps ):ReactElement => {
  const canvasRef = useRef(null);
  let ctx: OffscreenCanvasRenderingContext2D; 
  let posx: number;
  let posy: number;
  let previousStates: ImageData [] = [];

  useEffect (() => {
    ctx = canvasRef.current.getContext("2d");
  })

  const setPosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    const rect = canvasRef.current.getBoundingClientRect();
    posx = event.clientX - rect.left;
    //accounts for mouse offset
    posy = event.clientY - rect.top;
  }

  const mouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    const currentState: ImageData = ctx.getImageData(0,0,500,500);
    previousStates.push(currentState);
  }

  const onDelete = (): void => {
    const currentState = previousStates.pop()
    if (currentState) {
      ctx.putImageData(currentState,0,0)
    } else {
      ctx.clearRect(0, 0, 500, 500);
    }
  }
  const onClear = (): void => {
    ctx.clearRect(0, 0, 500, 500);
    previousStates = [];
  }

  const mouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    if (event.buttons !== 1) return;
    ctx.beginPath()
    ctx.moveTo(posx, posy);
    console.log('old', posx, posy)
    setPosition(event);
    console.log('new', posx, posy)
    ctx.lineWidth = 5;
    ctx.lineTo(posx, posy);
    ctx.closePath()
    ctx.stroke();
  }

  const handleClick = (e: React.MouseEvent) => {
    const data = canvasRef.current.toDataURL()
    console.log('sending base64 data')
    submitDrawing(data)
  }
  return (<>
    <div className="room">
      <div/>
      <div className="main">
      <h2 className="title">Draw the prompt!</h2>
        <span className="prompt">{prompt}</span>
        <canvas className="canvas" ref={ canvasRef } onMouseDown ={setPosition} onMouseUp ={mouseUp} onMouseMove = {mouseMove} width="500" height="500"></canvas>
        <div className="drawing_buttons">
          <span className="button" onClick={ onDelete }>{"Undo"}</span>
          <span className="button" onClick={ onClear }>{"Clear"}</span>
          <span className="button" onClick={ handleClick }>{"Submit"}</span>
        </div>
      </div>
      <div/>
    </div>
  </>)
}

export interface DrawingCanvasProps {
  prompt: string,
  submitDrawing: Function,
}