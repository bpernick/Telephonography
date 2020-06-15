import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer} from 'apollo-server-express';
// import { execute, subscribe } from 'graphql';
// import { PubSub } from 'graphql-subscriptions';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
import {resolvers} from './resolvers/map'
import {typeDefs} from './schema'

const app = express();


app.use(express.static('public'));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)
// const pubsub = new PubSub();

httpServer.listen(3000, () => {
  console.log("Listening!")
})

