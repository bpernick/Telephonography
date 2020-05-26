import { 
  Application, 
  send, 
  path, 
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  config,
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

graphql(schema, '{ hello }', root).then((response: Greeter) => {
  console.log(response, Deno.env.get('DENO_ENV'));
});
(async () => {
  const app = new Application()

  app.use(async ctx => {
    const filePath = path.join(Deno.cwd(), 'server', 'static')
    await send(ctx, ctx.request.url.pathname, {
      root: filePath,
      index: 'index.html',
    })
  })

  console.log('server is runing on: http://localhost:8000')
  await app.listen({ port: 8000 })
})()
