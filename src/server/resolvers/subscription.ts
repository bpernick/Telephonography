import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const gamePlaySubscription = (_:any, {gameHash}: any) => pubsub.asyncIterator([`${gameHash}_GAME_STARTED`, `${gameHash}_GAME_FINISHED`]) 

