import React, { ReactElement, MouseEventHandler, Dispatch, SetStateAction } from 'react'
// const phoneImage = require ('/Users/ben/Desktop/barebones-react-typescript-express/src/images/clipart-phone-silhouette.png')
export const Login = ({ 
  joinGameButtonClick, 
  getIdButtonClick, 
  onChangeName, 
  onChangeGameHash,
  name, 
  gameHash,
}: LoginProps ): ReactElement  => {
  
  return (<div className="room">
      <div/>
      <div className="main">
        <h2 className="title">Telephonography</h2>
        <p>If you want to start a new game, <span className = "button get-id" onClick={ getIdButtonClick }> get a code! </span></p>
        <p>Otherwise, wait for your host to send a code.</p>
          <p className="before-button">
          <div>
            <label htmlFor="name">Name:</label>
            <input className = "input name" type="text" name="name" value= { name } onChange={(e)=>{onChangeName(e.target.value)}}></input>
          </div>
          <div>
            <label htmlFor="id">Code:</label>
            <input className = "input id" type="text" name="id" value={ gameHash } onChange={(e)=>{onChangeGameHash(e.target.value)}}></input>
          </div>
          </p>
          <span className = "button joingame"  onClick={ joinGameButtonClick }>Join Game!</span>
      </div>
      <div/>
      {/* <img src={phoneImage}></img> */}
  </div>)
}

export interface LoginProps {
  joinGameButtonClick: MouseEventHandler,
  getIdButtonClick: MouseEventHandler, 
  onChangeName: Dispatch<SetStateAction<string>>, 
  onChangeGameHash: Dispatch<SetStateAction<string>>, 
  name: string, 
  gameHash: string,
}