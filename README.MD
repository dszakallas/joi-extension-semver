# joi-extension-semver

[![Build Status](https://travis-ci.org/dszakallas/joi-extension-semver.svg?branch=master)](https://travis-ci.org/dszakallas/joi-extension-semver)

Semver extension for the Joi validation library

## Usage

```js

const Joi = require('@hapi/joi')
  .extend(require('joi-extension-semver'))

Joi.attempt('1.2.3', joi.semver().gte('1.2.3')) // 1.2.3
Joi.attempt('1.2.3', joi.semver().lt('1.2.3')) // throws ValidationError
Joi.attempt('1.2.3', joi.semver().satisfies('^1.0.0')) // 1.2.3
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
    - [`semver.validRange()`](#semvervalidrange)
    - [`semver.satisfies(rng)`](#semversatisfiesrng)
    - [`semver.gtr(rng)`](#semvergtrrng)
    - [`semver.ltr(rng)`](#semverltrrng)
    - [`semver.outside(hilo, rng)`](#semveroutsidehilo-rng)

### `semver`

Starts the chain. Does not perform any validation in itself. The reason for this is that it is possible to continue with [`semver.validRange()`](#semvervalidrange) in which
case the expected value should be a range instead of a version.

### `semver.valid()`
Asserts `valid(value)`.
### `semver.gt(exp)`
Asserts `gt(value, exp)`.
### `semver.gte(exp)`
Asserts `gte(value, exp)`.
### `semver.lt(exp)`
Asserts `lt(value, exp)`.
### `semver.lte(exp)`
Asserts `lte(value, exp)`.
### `semver.eq(exp)`
Asserts `eq(value, exp)`.
### `semver.neq(exp)`
Asserts `neq(value, exp)`.
### `semver.cmp(comp, exp)`
Asserts `cmp(value, comp, exp)`.
### `semver.validRange()`
Asserts `validRange(value)`.
### `semver.satisfies(rng)`
Asserts `satisfies(value, rng)`.
### `semver.gtr(rng)`
Asserts `gtr(value, rng)`.
### `semver.ltr(rng)`
Asserts `ltr(value, rng)`.
### `semver.outside(hilo, rng)`
Asserts `outside(value, hilo, rng)`.
