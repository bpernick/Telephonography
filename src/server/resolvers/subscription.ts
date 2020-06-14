import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const gamePlaySubscription = () => pubsub.asyncIterator(['GAME_STARTED', 'GAME_FINISHED']) 

