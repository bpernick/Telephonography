import React, { ReactElement } from "react";

export const GameEnd = ({
  finalAnswers
}: GameEndProps ): ReactElement => {
return (<div>{finalAnswers.map((answer: IFinalAnswers, i: number) => {
return(<div><span>{answer.prompt}</span><>{!!answer.drawing && <img src={answer.drawing}></img>}</></div>)
})}</div>)
};

export interface GameEndProps {
  finalAnswers: IFinalAnswers[]
}
export interface IFinalAnswers {
  prompt?: string,
  drawing?: string,
}