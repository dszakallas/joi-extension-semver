'use strict'

const Joi = require('@hapi/joi')
const semver = require('semver')

const extensionName = 'semver'

const validRule = {
  name: 'valid',
  validate: function (params, value, state, options) {
    return semver.valid(value) ? value : this.createError(`${extensionName}.valid`, { v: value }, state, options)
  }
}

const simpleComparatorRules = ['gt', 'gte', 'lt', 'lte', 'eq', 'neq'].map(function (name) {
  return {
    name,
    params: {
      exp: Joi.string().required()
    },
    validate: function (params, value, state, options) {
      return semver[name](value, params.exp) ? value : this.createError(`${extensionName}.${name}`, { v: value, exp: params.exp }, state, options)
    }
  }
})

const cmpRule = {
  name: 'cmp',
  params: {
    cmp: Joi.string().required(),
    exp: Joi.string().required()
  },
  validate: function (params, value, state, options) {
    return semver.cmp(value, params.cmp, params.exp) ? value : this.createError(`${extensionName}.cmp`, { v: value, cmp: params.cmp, exp: params.exp }, state, options)
  }
}

const validRangeRule = {
  name: 'validRange',
  validate: function (params, value, state, options) {
    return semver.validRange(value) ? value : this.createError(`${extensionName}.validRange`, { v: value }, state, options)
  }
}

const rangeComparatorRules = ['satisfies', 'gtr', 'ltr'].map(function (name) {
  return {
    name,
    params: {
      rng: Joi.string().required()
    },
    validate: function (params, value, state, options) {
      return semver[name](value, params.rng) ? value : this.createError(`${extensionName}.${name}`, { v: value, rng: params.rng }, state, options)
    }
  }
})

const outsideRule = {
  name: 'outside',
  params: {
    hilo: Joi.string().required(),
    rng: Joi.string().required()
  },
  validate: function (params, value, state, options) {
    return semver.outside(value, params.rng, params.hilo) ? value : this.createError(`${extensionName}.outside`, { v: value, hilo: params.hilo, rng: params.rng }, state, options)
  }
}

const rules = []
  .concat([validRule])
  .concat(simpleComparatorRules)
  .concat([cmpRule])
  .concat([validRangeRule])
  .concat(rangeComparatorRules)
  .concat([outsideRule])

const extension = {
  base: Joi.string(),
  name: 'semver',
  language: {
    valid: 'needs to be a valid semver expression',
    gt: 'needs to be greater than {{exp}}',
    gte: 'needs to be greater than or equal to {{exp}}',
    lt: 'needs to be less than {{exp}}',
    lte: 'needs to be less than or equal to {{exp}}',
    eq: 'needs to be logically equivalent to {{exp}}',
    neq: 'needs to be logically different than {{exp}}',
    cmp: 'needs to satisfy {{cmp}} on {{exp}}',
    validRange: 'needs to be a valid range',
    satisfies: 'needs to satisfy {{rng}}',
    gtr: 'needs to be greater than range {{rng}}',
    ltr: 'needs to be less than range {{rng}}',
    outside: 'needs to be {{hilo}} than range {{rng}}'
  },
  rules
}

module.exports = extension
