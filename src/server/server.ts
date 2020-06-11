import * as express from 'express';
const { ApolloServer, gql } = require('apollo-server-express');
const {resolvers} = require ('./resolvers/map')
import apiRouter from './routes';

const app = express();

const typeDefs = gql`

type GameState {
  started: Boolean
  turn: Int
  numOfPlayers: Int
}
type Game {
  gameState: GameState
}
type Query {
  game(id: Int): Game
}
type Mutation {
  newGame: Float
}
`;
app.use(express.static('public'));
app.use(apiRouter);

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
