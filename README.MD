# joi-extension-semver

Semver extension for the Joi validation library

## Usage

```js

var joi = require('joi')
  .extend(require('joi-extension-semver'));

expect(joi.attempt('1.2.3', joi.semver().gte('1.2.3'))).to.eql('1.2.3'); //1.2.3
expect(joi.attempt('1.2.3', joi.semver().lt('1.2.3'))).to.eql('1.2.3'); // throw ValidationError
expect(joi.attempt('1.2.3', joi.semver().satisfies('^1.0.0'))); // 1.2.3
```

## Validation chains

- [Joi]
  - [`semver`](#semver)
    - [`semver.valid`](#valid)
    - [`semver.gt`](#gt)
    - [`semver.gte`](#gte)
    - [`semver.lt`](#lt)
    - [`semver.lte`](#lte)
    - [`semver.eq`](#eq)
    - [`semver.neq`](#neq)
    - [`semver.cmp`](#cmp)
    - [`semver.validRange`](#validRange)
    - [`semver.satisfies`](#satisfies)
    - [`semver.gtr`](#gtr)
    - [`semver.ltr`](#ltr)
    - [`semver.outside`](#outside)
