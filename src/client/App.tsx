import React, {useState, useEffect, ReactElement} from 'react';
import { Canvas } from './canvas'

const query = `
  mutation {
    randomId
  }
`;

const url = "/graphql";
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
};

const App = (): ReactElement => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const getNewId = () => {
    fetch (url, opts)
    .then(r => r.json())
    .then(data => {
      setId(data.data.randomId)
    })
  }
  const getNewGame = () => {
    setId('')
    setName('')
  }
  return (
    <>
      <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
      <input type="text" name="id" value={id} onChange={(e)=>{setId(e.target.value)}}></input>
      <button onClick={getNewId}>Get ID</button>
      <button onClick={getNewGame}>Start Game!</button>
      <Canvas></Canvas>

    </>
  );
}
export interface IAppProps {}

export interface IAppState {
  name: string;
  
}
export interface Query {
  query?: string;
  mutation?: string;
  subscription?: string;
}
export default App;
