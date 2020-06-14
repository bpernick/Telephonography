DROP DATABASE IF EXISTS telephonography;

CREATE DATABASE telephonography;

\connect telephonography;

CREATE TABLE games (
  hash VARCHAR(255) NOT NULL PRIMARY KEY
  how_many_players SMALLINT NOT NULL
  is_started BOOLEAN
)

CREATE TABLE players (
  id INT SERIAL NOT NULL PRIMARY KEY
  name VARCHAR (255) NOT NULL
  player_order SMALLINT NOT NULL
  score SMALLINT
  turn_number SMALLINT NOT NULL
  game_id VARCHAR (255) 
  FOREIGN KEY (game_id) REFERENCES games (hash)
)

CREATE TABLE drawings_and_prompts (
  id INT SERIAL NOT NULL PRIMARY KEY
  drawings bytea []
  prompts VARCHAR(255)[]
  player_id INT
  game_id VARCHAR (255)
  FOREIGN KEY (player_id) REFERENCES players (id)
  FOREIGN KEY (game_id) REFERENCES games (hash)
)