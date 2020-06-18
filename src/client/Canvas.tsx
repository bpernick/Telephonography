import React, {useRef, useEffect, useState} from 'react'

export const Canvas = (props: any) => {
  const canvasRef = useRef(null);
  let ctx: OffscreenCanvasRenderingContext2D; 

  useEffect (() => {
    ctx = canvasRef.current.getContext("2d");
  })

  let posx: number;
  let posy: number;

  const setPosition = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    posx = event.clientX;
    posy = event.clientY - 20;
  }

  const mouseUp = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
    console.log(ctx.getImageData(0,0,500,500));
    ctx.closePath()
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

  return (<canvas ref = {canvasRef} onMouseDown ={setPosition} onMouseUp ={mouseUp} onMouseMove = {mouseMove} width="500" height="500"></canvas>)
}