// TypeScript Version: 3.5

import { Extension, AnySchema } from '@hapi/joi'

export const semver: Extension
export const semverRange: Extension

export type Comparison = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | '===' | '!=='
export type Hilo = '>' | '<'

export interface SemverSchema extends AnySchema {
  valid(): this
  gt(exp: string): this
  gte(exp: string): this
  lt(exp: string): this
  lte(exp: string): this
  eq(exp: string): this
  neq(exp: string): this
  cmp(comp: Comparison, exp: string): this
  satisfies(rng: string): this
  gtr(rng: string): this
  ltr(rng: string): this
  outside(hilo: Hilo, rng: string): this
}

export interface SemverRangeSchema extends AnySchema {
  valid(): this
}

declare module "@hapi/joi" {
  interface Root {
    semver(): SemverSchema
    semverRange(): SemverRangeSchema
  }
}
