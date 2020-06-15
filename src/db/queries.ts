const {Client, Pool} = require ('pg');

// insert into games (hash, how_many_players) values ('myhash', 1) on conflict (hash) do update set how_many_players = (select how_many_players from games where hash = 'myhash') + 1 returning how_many_players;

const pool = new Pool ({
  host : process.env.HOSTNAME,
  user : process.env.USERNAME,
  port : 5432,
  database: process.env.DB_NAME,
  max: 100
})

export const joinGame = (gameHash: string, name: string) => {
  console.log('env', process.env.USERNAME)
  const updateGame = 'insert into games (hash, how_many_players) values ($1, 1) on conflict (hash) do update set how_many_players = (select how_many_players from games where hash = $1) + 1 returning how_many_players;'
  const insertPlayerQuery = 'insert into players (name, player_order, game_id) values ($1,$2,$3) returning id'
  const insertDrawingsQuery = 'insert into drawings_and_prompts (player_id, game_id) values ($1,$2)'
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
        pool.query (insertDrawingsQuery, [playerUniqueId, gameHash], (err: Error) => {
          if (err) {
            reject (err);
            return;
          }
          resolve ({
            playerOrder,
            playerUniqueId,
          });
        })
      })
    })
  })
}

export const startGameQuery = (id: string): Promise<number> => {
  const query = 'select how_many_players from games where id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [id], (err: Error, result: any) => {
      if (err) {
        reject (err);
        return;
      }
      resolve(result);
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
      resolve(result[0]);
    })
  })
}

export const addPrompt = (prompt: string, nextPlayerId: number, playerId: number): Promise<void> => {
  const updateNextPlayer = 'update players set next_prompt = ? where id = ?'
  const updatePrompts = 'update drawings_and_prompts set prompts  = array_append(prompts , ?) where player_id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(updateNextPlayer, [prompt, nextPlayerId], (err: Error) =>{
      if (err) {
        console.log('error sending drawing to next player')
        reject(err);
        return;
      }
      pool.query(updatePrompts, [prompt, playerId], (err: Error) =>{
        if (err) {
          console.log('error storing drawing')
          reject(err);
          return;
        }
        resolve();
      })
    })
  });
}

export const addDrawing = (drawing: string, nextPlayerId: number, playerId: number): Promise<void> => {
  //add drawing to table and next player
  const updateNextPlayer = 'update players set next_drawing = ? where id = ?'
  const updateDrawings = 'update drawings_and_prompts set drawings = array_append(drawings, ?) where player_id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(updateNextPlayer, [drawing, nextPlayerId], (err: Error) =>{
      if (err) {
        console.log('error sending drawing to next player')
        reject(err);
        return;
      }
      pool.query(updateDrawings, [drawing, playerId], (err: Error) =>{
        if (err) {
          console.log('error storing drawing')
          reject(err);
          return;
        }
        resolve();
      })
    })
  });
}

export const getNextPrompt = (playerId: number): Promise<string|null> => {
  const query = 'select next_prompt from players where id = ?'
  const update = 'update players set next_prompt = null where id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerId], (err: Error, promptArr: any) => {
      if (err) {
        reject (err);
        return;
      } 
      const prompt = promptArr[0];
      if (!prompt) {
        resolve (null);
        return;
      }
      pool.query(update, [playerId], (err: Error) => {
        if (err) {
          reject (err);
          return;
        }
        resolve(prompt);
      })
    })
  })
}

export const getNextDrawing = (playerId: number): Promise<string|null> => {
  const query = 'select next_drawing from players where id = ?'
  const update = 'update players set next_drawing = null where id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerId], (err: Error, drawingArr: any) => {
      if (err) {
        reject (err);
        return;
      } 
      const drawing = drawingArr[0];
      if (!drawing) {
        resolve (null);
        return;
      }
      pool.query(update, [playerId], (err: Error) => {
        if (err) {
          reject (err);
          return;
        }
        resolve(drawing);
      })
    })
  })
  
}

export const incrementScore = (playerId: number): Promise<void> => {
  const update = 'update players set score = score + 1 where id = ?'
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

export const resetGame = () => {
  
}

