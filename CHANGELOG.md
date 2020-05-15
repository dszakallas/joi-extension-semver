# Changelog

## 4.1.0

- Provide types for TypeScript.


## 4.0.0

- BREAKING CHANGE: Require [@hapi/joi][] ^16.0.0.
- BREAKING CHANGE: module now exports an object.

  If you have existing code like

  ```js
  const semver = require('joi-extension-semver')
  const Joi = require('@hapi/joi').extend(semver)
  ```

  update it to

  ```js
  const { semver } = require('joi-extension-semver')
  const Joi = require('@hapi/joi').extend(semver)
  ```

- BREAKING CHANGE: `semverRange` is now a seperate type from `semver`.

  If you have existing code that calls `.validRange()` like

  ```js
  const semver = require('joi-extension-semver')
  const Joi = require('@hapi/joi').extend(semver)
  Joi.attempt('>=1.2.3', Joi.semver().validRange())
  ```

  update it to

  ```js
  const { semverRange } = require('joi-extension-semver')
  const Joi = require('@hapi/joi').extend(semverRange)
  Joi.attempt('>=1.2.3', Joi.semverRange().valid())
  ```

## 3.0.0

- BREAKING CHANGE: Require [@hapi/joi][] instead of deprecated [joi][].
- BREAKING CHANGE: Require Node 8+.
- Update [semver][] dependency.

[@hapi/joi]: https://www.npmjs.com/package/@hapi/joi
[joi]: https://www.npmjs.com/package/joi
[semver]: https://www.npmjs.com/package/semver
