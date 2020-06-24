import { QueryOptionsObject } from './types'
export const getOpts = (query: string): QueryOptionsObject => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query })
});