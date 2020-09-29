# joi-extension-semver

[![version](https://img.shields.io/npm/v/joi-extension-semver)][npm]
[![license](https://img.shields.io/npm/l/joi-extension-semver)][npm]
[![build](https://img.shields.io/github/workflow/status/dszakallas/joi-extension-semver/ci/master)][build]

[npm]: https://www.npmjs.com/package/joi-extension-semver
[build]: https://travis-ci.org/dszakallas/joi-extension-semver

Semver extension for the [Joi][] validation library

[joi]: https://github.com/sideway/joi

## Usage

```js
const { semver, semverRange } = require('joi-extension-semver')
const Joi = require('joi')
    .extend(semver)
    .extend(semverRange)

Joi.attempt('1.2.3', Joi.semver().valid()) // '1.2.3'
Joi.attempt('>=1.2.3', Joi.semverRange().valid()) // '>=1.2.3'

Joi.attempt('1.2.3', Joi.semver().gte('1.2.3')) // '1.2.3'
Joi.attempt('1.2.3', Joi.semver().lt('1.2.3')) // throws ValidationError
Joi.attempt('1.2.3', Joi.semver().satisfies('^1.0.0')) // '1.2.3'
```

## Validation chains

See [semver documentation](https://www.npmjs.com/package/semver). All `boolean`
returning comparisons are supported.

- Joi
  - [`semver`](#semver)
    - [`semver.valid()`](#semvervalid)
    - [`semver.gt(exp)`](#semvergtexp)
    - [`semver.gte(exp)`](#semvergteexp)
    - [`semver.lt(exp)`](#semverltexp)
    - [`semver.lte(exp)`](#semverlteexp)
    - [`semver.eq(exp)`](#semvereqexp)
    - [`semver.neq(exp)`](#semverneqexp)
    - [`semver.cmp(cmp, exp)`](#semvercmpcmp-exp)
    - [`semver.satisfies(rng)`](#semversatisfiesrng)
    - [`semver.gtr(rng)`](#semvergtrrng)
    - [`semver.ltr(rng)`](#semverltrrng)
    - [`semver.outside(hilo, rng)`](#semveroutsidehilo-rng)
  - [`semverRange`](#semverRange)
    - [`semverRange.valid()`](#semverRangevalid)

### `semver`

Starts the chain.

#### `semver.valid()`
Asserts `valid(value)`.
#### `semver.gt(exp)`
Asserts `gt(value, exp)`.
#### `semver.gte(exp)`
Asserts `gte(value, exp)`.
#### `semver.lt(exp)`
Asserts `lt(value, exp)`.
#### `semver.lte(exp)`
Asserts `lte(value, exp)`.
#### `semver.eq(exp)`
Asserts `eq(value, exp)`.
#### `semver.neq(exp)`
Asserts `neq(value, exp)`.
#### `semver.cmp(comp, exp)`
Asserts `cmp(value, comp, exp)`.
#### `semver.satisfies(rng)`
Asserts `satisfies(value, rng)`.
#### `semver.gtr(rng)`
Asserts `gtr(value, rng)`.
#### `semver.ltr(rng)`
Asserts `ltr(value, rng)`.
#### `semver.outside(hilo, rng)`
Asserts `outside(value, hilo, rng)`.

### `semverRange`

Starts the chain.

#### `semverRange.valid()`
Asserts `validRange(value)`.
