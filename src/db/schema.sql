DROP DATABASE IF EXISTS telephonography;

CREATE DATABASE telephonography;

\connect telephonography;

CREATE TABLE games (
  hash VARCHAR(255) NOT NULL PRIMARY KEY
  how_many_players SMALLINT DEFAULT 0 NOT NULL
  is_started BOOLEAN
)
  
CREATE TABLE players (
  id INT SERIAL NOT NULL PRIMARY KEY
  name VARCHAR (255) NOT NULL
  player_order SMALLINT DEFAULT 0 NOT NULL
  score SMALLINT DEFAULT 0 NOT NULL
  turn_number SMALLINT DEFAULT 0 NOT NULL
  game_id VARCHAR (255) NOT NULL
  FOREIGN KEY (game_id) REFERENCES games (hash)
)

CREATE TABLE drawings_and_prompts (
  id INT SERIAL NOT NULL PRIMARY KEY
  drawings bytea []
  prompts VARCHAR(255)[]
  player_id INT NOT NULL
  game_id VARCHAR (255) NOT NULL
  FOREIGN KEY (player_id) REFERENCES players (id)
  FOREIGN KEY (game_id) REFERENCES games (hash)
)