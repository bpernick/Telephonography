import React, { ReactElement } from "react";

export const GameEnd = ({
  finalAnswers
}: GameEndProps ): ReactElement => {
return (<div className="room">
  <div/>
  <div className="main">
    <div>{finalAnswers.map((answer: IFinalAnswers, i: number) => {
    return(<div className="main"><span>{answer.prompt}</span><>{!!answer.drawing && <img className="canvas" src={answer.drawing}></img>}</></div>)
    })}</div>
    </div>
  <div/>
</div>)
};

export interface GameEndProps {
  finalAnswers: IFinalAnswers[]
}
export interface IFinalAnswers {
  prompt?: string,
  drawing?: string,
}