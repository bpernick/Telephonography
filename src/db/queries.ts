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

module.exports.joinGame = () => {

}

module.exports.startGame = () => {
  
}

module.exports.addPrompt = () => {
  
}

module.exports.addDrawing = () => {
  
}

module.exports.getNextPrompt = () => {
  
}

module.exports.getNextDrawing = () => {
  
}

module.exports.incrementScore = () => {
  
}

module.exports.resetGame = () => {
  
}

