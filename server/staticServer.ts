import { 
  Application,
  Router, 
  send, 
  path, 
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from './deps.ts'
import "https://deno.land/x/dotenv/load.ts"
import {Greeter} from './types.ts'

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});;

var root = { hello: () => 'Hello world!' };



const router = new Router();
const app = new Application()
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  const filePath = path.join(Deno.cwd(), 'server', 'static')
  await send(ctx, ctx.request.url.pathname, {
    root: filePath,
    index: 'index.html',
  })
})
router
  .get('/graphql', async (ctx) => {
    const response: Greeter = await graphql(schema, '{ hello }', root)
    console.log(response);
    ctx.response.headers.set('Content-Type', 'application/json');
    ctx.response.body = response;
  });

console.log('server is runing on: http://localhost:8000')
await app.listen({ port: 8000 })

