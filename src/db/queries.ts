const {Client, Pool} = require ('pg');

const pool = new Pool ({
  host : process.env.DB_NAME,
  user : process.env.USERNAME,
  password: process.env.PASSWORD,
  port : 5432,
  database: 'images_render',
  max: 100
})

export const joinGame = (gameHash: string, name: string) => {
  const updateGame = 'WITH upsert AS (update game set how_many_players = how_many_players + 1,  where id = $1 returning how_many_players) INSERT INTO game (how_many_players, id) values (1, $1) RETURNING 1 WHERE NOT EXISTS upsert'
  const insertPlayerQuery = 'insert into players (name, player_order, game_id) values (?,?,?)'
  const insertDrawingsQuery = 'insert into drawings_and_prompts (player_id, game_id) values (?,?)'
  return new Promise ((resolve, reject) => {
    pool.query(updateGame,[gameHash], (err: Error, order) => {
      if (err) {
        reject (err);
        return;
      }
      const playerOrder = order[0];
      console.log(`player ${playerOrder} joined game!`)
      pool.query (insertPlayerQuery, [name, playerOrder ,gameHash], (err: Error, insertPlayerResult) => {
        if (err) {
          reject (err);
          return;
        }
        const playerUniqueId = insertPlayerResult[0].id;
        console.log(`inserted player ${playerUniqueId}`)
        pool.query (insertDrawingsQuery, [playerUniqueId, gameHash], (err: Error) => {
          if (err) {
            reject (err);
            return;
          }
          resolve (playerOrder);
        })
      })
    })
  })
}

export const startGameQuery = (id: string): Promise<number> => {
  const query = 'select how_many_players from games where id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [id], (err: Error, result) => {
      if (err) {
        reject (err);
        return;
      }
      resolve(result);
    })
  })
}

export const addPrompt = (prompt: string, nextPlayer: number, playerId: number): Promise<void> => {
  const updateNextPlayer = 'update players set next_prompt = ? where player_order = ?'
  const updatePrompts = 'update drawings_and_prompts set prompts  = array_append(prompts , ?) where player_id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(updateNextPlayer, [prompt, nextPlayer], (err: Error) =>{
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

export const addDrawing = (drawing: string, nextPlayer: number, playerId: number): Promise<void> => {
  const updateNextPlayer = 'update players set next_drawing = ? where player_order = ?'
  const updateDrawings = 'update drawings_and_prompts set drawings = array_append(drawings, ?) where player_id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(updateNextPlayer, [drawing, nextPlayer], (err: Error) =>{
      if (err) {
        console.log('error sending drawing to next player')
        reject(err);
        return;
      }
      pool.query(updateDrawings, [drawing, playerId], (err) =>{
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

export const getNextPrompt = (playerOrder: number): Promise<string|null> => {
  const query = 'select next_prompt from players where player_order = ?'
  const update = 'update players set next_prompt = null where player_order = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerOrder], (err: Error, promptArr) => {
      if (err) {
        reject (err);
        return;
      } 
      const prompt = promptArr[0];
      if (!prompt) {
        resolve (null);
        return;
      }
      pool.query(update, [playerOrder], (err: Error) => {
        if (err) {
          reject (err);
          return;
        }
        resolve(prompt);
      })
    })
  })
}

export const getNextDrawing = (playerOrder: number): Promise<string|null> => {
  const query = 'select next_drawing from players where player_order = ?'
  const update = 'update players set next_drawing = null where player_order = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [playerOrder], (err: Error, drawingArr) => {
      if (err) {
        reject (err);
        return;
      } 
      const drawing = drawingArr[0];
      if (!drawing) {
        resolve (null);
        return;
      }
      pool.query(update, [playerOrder], (err) => {
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

