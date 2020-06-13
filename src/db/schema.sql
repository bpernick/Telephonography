DROP DATABASE IF EXISTS telephonography;

CREATE DATABASE telephonography;

\connect telephonography;

CREATE TABLE games (
  hash VARCHAR(255) NOT NULL
  how_many_players SMALLINT NOT NULL
  turn_number SMALLINT NOT NULL
  is_started BOOLEAN
)

CREATE TABLE players (
  hash VARCHAR(255) NOT NULL
  how_many_players SMALLINT NOT NULL
  turn_number SMALLINT NOT NULL
  is_started BOOLEAN
)


CREATE TABLE players (
  hash VARCHAR(255) NOT NULL
  how_many_players SMALLINT NOT NULL
  turn_number SMALLINT NOT NULL
  is_started BOOLEAN
)