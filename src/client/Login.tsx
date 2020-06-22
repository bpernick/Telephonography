import React, { ReactElement, MouseEventHandler, Dispatch, SetStateAction } from 'react'
export const Login = ({ 
  joinGameButtonClick, 
  getIdButtonClick, 
  onChangeName, 
  onChangeGameHash, 
  name, 
  gameHash,
}: LoginProps ): ReactElement  => {
  
  return (<>
      <input type="text" name="name" value= { name } onChange={(e)=>{onChangeName(e.target.value)}}></input>
      <input type="text" name="id" value={ gameHash } onChange={(e)=>{onChangeGameHash(e.target.value)}}></input>
      <button onClick={ getIdButtonClick }>Get ID</button>
      <button onClick={ joinGameButtonClick }>Join Game!</button>
  </>)
}

export interface LoginProps {
  joinGameButtonClick: MouseEventHandler,
  getIdButtonClick: MouseEventHandler, 
  onChangeName: Dispatch<SetStateAction<string>>, 
  onChangeGameHash: Dispatch<SetStateAction<string>>, 
  name: string, 
  gameHash: string,
}