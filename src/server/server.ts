import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer, gql } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
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
type Comment {
  id: String
  text: String
}
type Query {
  game(id: Int): Game
}
type Mutation {
  newGame: Float
  randomId: String
}
type Subscription {
  commentAdded(repoFullName: String!): Comment
}
`;
app.use(express.static('public'));
app.use(apiRouter);

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)
// const pubsub = new PubSub();

httpServer.listen(3000, () => {
    console.log("Listening!")
  })
};
