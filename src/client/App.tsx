import React, {useState, useEffect, ReactElement} from 'react';
import { Login } from './Login'
import { getOpts } from './graphqlHeaders'
import { GameRoom } from './GameRoom'

const App = (): ReactElement => {
  const [name, setName] = useState('');
  const [gameHash, setGameHash] = useState('');
  const [playerOrder, setOrder] = useState(-1);
  const [playerId, setId] = useState(-1);
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

  const joinGame = (): void => {
    if (!name || !gameHash) {
      alert("Please Enter Name and Code");
      return;
    }

    const mutation = `
    mutation {
      joinGame ( name: "${name}", gameHash: "${gameHash}") {
        playerOrder
        playerUniqueId
      }
    }
    `;
    fetch ('/graphql', getOpts(mutation))
    .then(r => r.json())
    .then(({ data }) => {
      setId(data.joinGame.playerUniqueId)
      setOrder(data.joinGame.playerOrder)
      setLoggedIn(true)
    })
  }

  return (
    <> {
      isLoggedIn ?
      <GameRoom gameHash = { gameHash } playerId = { playerId } playerOrder = { playerOrder } />:
      <Login joinGameButtonClick = { joinGame } getIdButtonClick = { getNewId } onChangeName = { setName } onChangeGameHash = { setGameHash } name = { name } gameHash = { gameHash } />
    }</>
  );
}

export default App;
