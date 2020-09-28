'use strict'

const Joi = require('joi')
const semver = require('semver')

const extensionName = 'semver'

const semverRangeExtension = {
  base: Joi.string(),
  type: 'semverRange',
  validate: function (value, { error }) {
    return semver.validRange(value) ? { value } : { errors: error(`${extensionName}.valid`) }
  },
  messages: {
    [`${extensionName}.valid`]: '{{#label}} needs to be a valid semver range'
  }
}

const rules = {}

rules.compare = {
  method: false,
  validate: function (value, helpers, { exp }, { name }) {
    return semver[name](value, exp) ? value : helpers.error(`${extensionName}.${name}`, { exp })
  },
  args: [
    {
      name: 'exp',
      assert: semver.valid,
      message: 'needs to be a valid semver expression'
    }
  ]
}

;['gt', 'gte', 'lt', 'lte', 'eq', 'neq'].forEach(function (name) {
  rules[name] = {
    method: function (exp) {
      return this.$_addRule({ name, method: 'compare', args: { exp } })
    }
  }
})

rules.cmp = {
  method: function (cmp, exp) {
    return this.$_addRule({ name: 'cmp', args: { cmp, exp } })
  },
  validate: function (value, helpers, { cmp, exp }) {
    return semver.cmp(value, cmp, exp) ? value : helpers.error(`${extensionName}.cmp`, { cmp, exp })
  },
  args: [
    {
      name: 'cmp',
      assert: (cmp) => ['===', '!==', '', '=', '==', '!=', '>', '>=', '<', '<='].includes(cmp),
      message: 'needs to be a valid comparator'
    },
    {
      name: 'exp',
      assert: semver.valid,
      message: 'needs to be a valid semver expression'
    }
  ]
}

rules.compareRange = {
  method: false,
  validate: function (value, helpers, { rng }, { name }) {
    return semver[name](value, rng) ? value : helpers.error(`${extensionName}.${name}`, { rng })
  },
  args: [
    {
      name: 'rng',
      assert: semver.validRange,
      message: 'needs to be a valid semver range'
    }
  ]
}

;['satisfies', 'gtr', 'ltr'].forEach(function (name) {
  rules[name] = {
    method: function (rng) {
      return this.$_addRule({ name, method: 'compareRange', args: { rng } })
    }
  }
})

rules.outside = {
  method: function (hilo, rng) {
    return this.$_addRule({ name: 'outside', args: { hilo, rng } })
  },
  validate: function (value, helpers, { hilo, rng }) {
    return semver.outside(value, rng, hilo) ? value : helpers.error(`${extensionName}.outside`, { hilo, rng })
  },
  args: [
    {
      name: 'hilo',
      assert: (hilo) => ['>', '<'].includes(hilo),
      message: 'needs to be a valid comparator'
    },
    {
      name: 'rng',
      assert: semver.validRange,
      message: 'needs to be a valid semver range'
    }
  ]
}

const semverExtension = {
  base: Joi.string(),
  type: 'semver',
  validate: function (value, { error }) {
    return semver.valid(value) ? { value } : { errors: error(`${extensionName}.valid`) }
  },
  messages: {
    [`${extensionName}.valid`]: '{{#label}} needs to be a valid semver expression',
    [`${extensionName}.gt`]: '{{#label}} needs to be greater than {{#exp}}',
    [`${extensionName}.gte`]: '{{#label}} needs to be greater than or equal to {{#exp}}',
    [`${extensionName}.lt`]: '{{#label}} needs to be less than {{#exp}}',
    [`${extensionName}.lte`]: '{{#label}} needs to be less than or equal to {{#exp}}',
    [`${extensionName}.eq`]: '{{#label}} needs to be logically equivalent to {{#exp}}',
    [`${extensionName}.neq`]: '{{#label}} needs to be logically different than {{#exp}}',
    [`${extensionName}.cmp`]: '{{#label}} needs to satisfy {{#cmp}} on {{#exp}}',
    [`${extensionName}.satisfies`]: '{{#label}} needs to satisfy {{#rng}}',
    [`${extensionName}.gtr`]: '{{#label}} needs to be greater than range {{#rng}}',
    [`${extensionName}.ltr`]: '{{#label}} needs to be less than range {{#rng}}',
    [`${extensionName}.outside`]: '{{#label}} needs to be {{#hilo}} than range {{#rng}}'
  },
  rules
}

module.exports = { semver: semverExtension, semverRange: semverRangeExtension }
