import React, {useRef, useEffect} from 'react'

export const DrawingCanvas = (props: any) => {
  const canvasRef = useRef(null);
  let ctx: OffscreenCanvasRenderingContext2D; 


  let posx: number;
  let posy: number;
  let previousStates: ImageData [] = [];

  useEffect (() => {
    ctx = canvasRef.current.getContext("2d");
  })

  const setPosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    posx = event.clientX;
    //accounts for mouse offset
    posy = event.clientY - 20;
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

  return (<>
    <canvas ref = {canvasRef} onMouseDown ={setPosition} onMouseUp ={mouseUp} onMouseMove = {mouseMove} width="500" height="500"></canvas>
    <button onClick={onDelete}>{"Undo"}</button>
    <button onClick={onClear}>{"Clear"}</button>
    <button>{"Submit"}</button>
  </>)
}