import React, { ReactElement, MouseEventHandler, Dispatch, SetStateAction } from 'react'
export const Login = ({ 
  joinGame, 
  getNewId, 
  setName, 
  setGameHash, 
  name, 
  gameHash, 
}: LoginProps ): ReactElement  => {
  
  return (<>
      <input type="text" name="name" value= { name } onChange={(e)=>{setName(e.target.value)}}></input>
      <input type="text" name="id" value={ gameHash } onChange={(e)=>{setGameHash(e.target.value)}}></input>
      <button onClick={ getNewId }>Get ID</button>
      <button onClick={ joinGame }>Join Game!</button>
  </>)
}

export interface LoginProps {
  joinGame: MouseEventHandler,
  getNewId: MouseEventHandler, 
  setName: Dispatch<SetStateAction<string>>, 
  setGameHash: Dispatch<SetStateAction<string>>, 
  name: string, 
  gameHash: string,
}