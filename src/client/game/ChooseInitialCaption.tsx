import React, { ReactElement } from "react";

export const ChooseInitialCaption = ({
  prompts,
  submitPrompt,
}: ChooseInitialCaptionPrompts): ReactElement => {
  return (
    <div className="room">
      <div/>
      <div className="main">
        <h2 className="title">Choose a prompt!</h2>
        <div className="prompts">{
          prompts.map((prompt, i) => {
            return(<><span className = "button" key = {i} onClick = {(e) => {submitPrompt(e.currentTarget.innerHTML)}} >{prompt}</span><br/></>)
          })}</div>
        </div>
    </div>
  )
}

export interface ChooseInitialCaptionPrompts {
  prompts: string[],
  submitPrompt: Function,
}