DROP DATABASE IF EXISTS telephonography;

CREATE DATABASE telephonography;

\connect telephonography;

CREATE TABLE games (
  hash VARCHAR(255) NOT NULL PRIMARY KEY,
  how_many_players SMALLINT DEFAULT 0 NOT NULL,
  players_left SMALLINT DEFAULT 0 NOT NULL,
  is_started BOOLEAN
);
  
CREATE TABLE players (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  player_order SMALLINT DEFAULT 0 NOT NULL,
  score SMALLINT DEFAULT 0 NOT NULL,
  turn_number SMALLINT DEFAULT 0 NOT NULL,
  game_id VARCHAR (255) NOT NULL,
  next_player SMALLINT,
  FOREIGN KEY (game_id) REFERENCES games (hash)
);

CREATE TABLE drawings_and_prompts (
  id SERIAL NOT NULL PRIMARY KEY,
  responses TEXT [],
  starting_player_order INT NOT NULL,
  game_id VARCHAR (255) NOT NULL,
  player_id SMALLINT,
  FOREIGN KEY (player_id) REFERENCES players (id),
  FOREIGN KEY (game_id) REFERENCES games (hash),
  UNIQUE (player_id, game_id)
);


CREATE UNIQUE INDEX asdf ON drawings_and_prompts (player_id);