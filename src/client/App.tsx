import React, {useState, useEffect, ReactElement} from 'react';
import { Login } from './Login'
import { getOpts } from './graphqlHeaders'
import { GamePage } from './GamePage'

const App = (): ReactElement => {
  const [name, setName] = useState('');
  const [gameHash, setGameHash] = useState('');
  const [playerOrder, setOrder] = useState(-1);
  const [playerId, setId] = useState(-1);
  const [nextPlayer, setNextPlayer] = useState(-1);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const getNewId = () => {
    const query = `
      query {
        randomId
      }
    `;
    fetch ('/graphql', getOpts(query))
    .then(r => r.json())
    .then(data => {
      setGameHash(data.data.randomId)
    })
  }

  const joinGame = () => {
    const query = `
    mutation {
      joinGame ( name: "${name}", gameHash: "${gameHash}") {
        playerOrder
        playerUniqueId
      }
    }
    `;
    fetch ('/graphql', getOpts(query))
    .then(r => r.json())
    .then(data => {
      setId(data.data.joinGame.id)
      setOrder(data.data.joinGame.playerOrder)
      setLoggedIn(true);
    })
  }

  const submitDrawing = (base64data: string) => {
    const query = `
    mutation {
      drawing (drawing:${base64data}, playerId: ${playerId}, nextPlayer: ${nextPlayer})
    }
  `;
  fetch ('/graphql', getOpts(query))
  .then(r => r.json())
  }

  return (
    <> {
      isLoggedIn ?
      <GamePage gameHash = { gameHash }/>:
      <Login joinGame = { joinGame } getNewId = { getNewId } setName = { setName } setGameHash = { setGameHash } name = { name } gameHash = { gameHash }/>
    }</>
  );
}

export default App;
