# joi-extension-semver

Semver extension for the Joi validation library

## Usage

```js

var joi = require('joi')
  .extend(require('joi-extension-semver'));

joi.attempt('1.2.3', joi.semver().gte('1.2.3')); //1.2.3
joi.attempt('1.2.3', joi.semver().lt('1.2.3')); // throws ValidationError
joi.attempt('1.2.3', joi.semver().satisfies('^1.0.0')); // 1.2.3
```

## Validation chains

- [Joi]
  - [`semver()`](#semver)
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
    - [`semver.outside(rng, hilo)`](#semveroutsiderng-hilo)

### `semver()`

Doesn't perform any validation in itself. The reason for this is that it is possible to continue with [`semver.validRange()`](#semvervalidrange) in which
case the expected value should be a range instead of a version.

### `semver.valid()`

### `semver.gt(exp)`
### `semver.gte(exp)`
### `semver.lt(exp)`
### `semver.lte(exp)`
### `semver.eq(exp)`
### `semver.neq(exp)`
### `semver.cmp(cmp, exp)`
### `semver.validRange()`
### `semver.satisfies(rng)`
### `semver.gtr(rng)`
### `semver.ltr(rng)`
### `semver.outside(rng, hilo)`
