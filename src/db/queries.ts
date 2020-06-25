const {Client, Pool} = require ('pg');


const pool = new Pool ({
  host : process.env.HOSTNAME,
  user : process.env.USERNAME,
  port : 5432,
  database: process.env.DB_NAME,
  max: 100
})

export const joinGame = (gameHash: string, name: string) => {
  console.log('env', process.env.USERNAME)
  const updateGame = 'insert into games (hash, how_many_players, players_left) values ($1, 1, 1) on conflict (hash) do update set how_many_players = (select how_many_players from games where hash = $1) + 1, players_left = (select players_left from games where hash = $1) + 1 returning how_many_players;'
  const insertPlayerQuery = 'insert into players (name, player_order, game_id) values ($1,$2,$3) returning id'
  return new Promise ((resolve, reject) => {
    pool.query(updateGame,[gameHash], (err: Error, order: any) => {
      if (err) {
        reject (err);
        return;
      }
      const playerOrder = order.rows[0]['how_many_players'];
      console.log('order', playerOrder)
      pool.query (insertPlayerQuery, [name, playerOrder ,gameHash], (err: Error, insertPlayerResult: any) => {
        if (err) {
          reject (err);
          return;
        }
        const playerUniqueId = insertPlayerResult.rows[0]['id'];
        console.log(`inserted player ${playerUniqueId}`)
        resolve ({
          playerOrder,
          playerUniqueId,
        });
      })
    })
  })
}

export const startGameQuery = (hash: string): Promise<number> => {
  const query = 'select how_many_players from games where hash = $1'
  return new Promise ((resolve, reject) => {
    pool.query(query, [hash], (err: Error, result: any) => {
      if (err) {
        reject (err);
        return;
      }
      resolve(result.rows[0]['how_many_players']);
    })
  })
}

export const getOrderById = (playerId: number): Promise<number> => {
  const query = 'select player_order from players where id = $1'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerId], (err: Error, results: any) =>{
      if (err) {
        console.log('error storing drawing')
        reject(err);
        return;
      }
      resolve(results.rows[0].player_order);
    })
  })
}

export const getUniqueIdFromOrder = (playerOrder: number, gameId: string): Promise<number> => {
  const query = 'select id from players where player_order = $1 and game_id = $2'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerOrder, gameId], (err: Error, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('rows', result.rows)
      resolve(result.rows[0].id);
    })
  })
}

export const getNumberOfPlayers = (gameHash: string): Promise<number> => {
  const query = 'select how_many_players from games where hash = $1';
  return new Promise ((resolve, reject) => {
    pool.query(query, [gameHash], (err: Error, result: any) =>{
      if (err) {
        console.log('error sending drawing to next player')
        reject(err);
        return;
      }
      resolve(result.rows[0].how_many_players);
    })
  })
}
export const addPrompt = (prompt: string, order: number, gameHash: string, playerId: number): Promise<void> => {
  const updatePrompts = 'insert into drawings_and_prompts (game_id, starting_player_order, player_id, responses) values ($1,$2,$3,$4) on conflict (player_id) do update set responses = array_append((select responses from drawings_and_prompts where starting_player_order = $2 and game_id = $1) , $5) where drawings_and_prompts.starting_player_order = $2 and drawings_and_prompts.game_id = $1'

  return new Promise ((resolve, reject) => {
    pool.query(updatePrompts, [gameHash, order, playerId,`{${prompt}}`, prompt], (err: Error, response: any) =>{
      if (err) {
        console.log('error storing drawing')
        reject(err);
        return;
      }
      resolve();
    })
  })
}

export const addDrawing = (drawing: string, order: number, gameHash: string, playerId: number): Promise<void> => {
  const updateDrawings = 'insert into drawings_and_prompts (game_id, starting_player_order, player_id, responses) values ($1,$2,$3,$4) on conflict (player_id) do update set responses = array_append((select responses from drawings_and_prompts where starting_player_order = $2 and game_id = $1) , $5) where drawings_and_prompts.starting_player_order = $2 and drawings_and_prompts.game_id = $1'


  return new Promise ((resolve, reject) => {
    pool.query(updateDrawings, [gameHash, order, playerId, `{${drawing}}`, drawing], (err: Error) =>{
      if (err) {
        console.log('error storing drawing')
        reject(err);
        return;
      }
      resolve();
    })
  })
}

export const getNextPlayer = (playerId: number): Promise<number> => {
  const query = 'select player_order from players where id = $1'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerId], (err: Error, results: any) =>{
      if (err) {
        console.log('error storing drawing')
        reject(err);
        return;
      }
      resolve(results.rows[0].player_order);
    })
  })
}

export const incrementScore = (playerId: number): Promise<void> => {
  const update = 'update players set score = (select score from players where id =$1) + 1'
  return new Promise ((resolve, reject) => {
    pool.query(update, [playerId], (err: Error) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  })
}

export const incrementTurn = (playerId: number, gameHash: string): Promise<number> => {
  const playersQuery = 'select how_many_players from games where hash = $1'
  const turnsQuery = 'select turn_number from players where id = $1'
  const updateTurn = 'update players set turn_number = $1 where id = $2'
  return new Promise ((resolve, reject) => {
    pool.query(playersQuery, [gameHash], (err: Error, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      const players: number = result.rows[0].how_many_players;
      console.log(players);
      pool.query(turnsQuery, [playerId], (err: Error, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        //if last turn has been completed, set turn to -1. Otherwise, increment it
        const turn: number = result.rows[0].turn_number + 1;
        console.log(turn)
        pool.query(updateTurn, [turn, playerId], (err: Error, result: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(turn)
        })
      })
    })
  })
}

export const decrementPlayersLeft = (gameHash: string): Promise<number> => {
  const update = 'update games set players_left = (select players_left from games where hash = $1) - 1 where hash = $1 returning players_left'
  return new Promise ((resolve, reject) => {
    pool.query(update, [gameHash], (err: Error, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows[0].players_left);
    })
  })
}

export const getAllPromptsAndDrawings = (gameHash: string): Promise<any> => {
  const query = 'select responses from drawings_and_prompts where game_id = $1 order by starting_player_order asc'
  return new Promise ((resolve, reject) => {
    pool.query(query, [gameHash], (err: Error, result: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.rows);
    })
  })
}

export const resetGame = () => {
  
}