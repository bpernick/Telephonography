const {Client, Pool} = require ('pg');
// const format = require('pg-format');

const pool = new Pool ({
  host : process.env.DB_NAME,
  user : process.env.USERNAME,
  password: process.env.PASSWORD,
  port : 5432,
  database: 'images_render',
  max: 100
})

export const joinGame = (id: string, name: string) => {
  const orderQuery = 'select how_many_players from games where id = ?'
  const insertQuery = 'insert into players (name, player_order, game_id) values (?,?,?)'
  return new Promise ((resolve, reject) => {
    pool.query(orderQuery, [id], (err, order) => {
      if (err) {
        reject (err);
        return;
      }
      const playerOrder = order[0] + 1
      pool.query (insertQuery, [name, playerOrder ,id], (err) => {
        if (err) {
          reject (err);
          return;
        }
        resolve(playerOrder);
      })
    })
  })
}

export const startGameQuery = (id: string): Promise<number> => {
  const query = 'select how_many_players from games where id = ?'
  return new Promise ((resolve, reject) => {
    pool.query(query, [id], (err, result) => {
      if (err) {
        reject (err);
        return;
      }
      resolve(result);
    })
  })
}

export const addPrompt = () => {
  
}

export const addDrawing = () => {
  
}

export const getNextPrompt = () => {
  
}

export const getNextDrawing = () => {
  
}

export const incrementScore = () => {
  
}

export const resetGame = () => {
  
}

