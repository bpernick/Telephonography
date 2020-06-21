import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer} from 'apollo-server-express';
import { resolvers } from './resolvers/map'
import { typeDefs } from './schema'

const app = express();


app.use(express.static('public'));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)

httpServer.listen(3000, () => {
  console.log("Listening!")
})

