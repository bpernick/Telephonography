import React, { ReactElement } from "react";

export const ChooseInitialCaption = ({
  prompts,
  submitPrompt,
}: ChooseInitialCaptionPrompts): ReactElement => {
  console.log(prompts, prompts)
  return (<div>{
    prompts.map((prompt, i) => {
      return(<span key = {i} onClick = {(e) => {submitPrompt(e.currentTarget.innerHTML)}} >{prompt}</span>)
    })}</div>
  )
}

export interface ChooseInitialCaptionPrompts {
  prompts: string[],
  submitPrompt: Function,
}