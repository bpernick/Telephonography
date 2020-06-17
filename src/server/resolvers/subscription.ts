// import { PubSub } from 'graphql-subscriptions';

// const pubsub = new PubSub();
import { pubSub} from './pubSub';

import { withFilter } from 'graphql-subscriptions'

export const gamePlaySubscription = withFilter(() => pubSub.asyncIterator('GAME_STARTED'), (payload, variables) => {
  return payload.id === variables.id;
})