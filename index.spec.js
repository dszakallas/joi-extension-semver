'use strict'

const { semver, semverRange } = require('.')
const Joi = require('joi').extend(semver).extend(semverRange)
const { expect } = require('chai')

describe('semver', function () {
  describe('.valid', function () {
    it('should accept valid version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().valid())).to.eql('1.2.3')
      expect(Joi.attempt('v1.2.3', Joi.semver().valid())).to.eql('v1.2.3')
    })
    it('should reject invalid version', function () {
      expect(function () { Joi.attempt('a.b.c', Joi.semver().valid()) }).to.throw(/"value" needs to be a valid semver expression/)
      expect(function () { Joi.attempt('58678', Joi.semver().valid()) }).to.throw(/"value" needs to be a valid semver expression/)
    })
  })

  describe('.gt', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().gt('0.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().gt('2.0.0')) }).to.throw(/"value" needs to be greater than 2\.0\.0/)
    })
  })

  describe('.gte', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().gte('1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().gte('2.0.0')) }).to.throw(/"value" needs to be greater than or equal to 2\.0\.0/)
    })
  })

  describe('.lt', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().lt('2.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().lt('1.2.3')) }).to.throw(/"value" needs to be less than 1\.2\.3/)
    })
  })

  describe('.lte', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().lte('1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().lte('1.0.0')) }).to.throw(/"value" needs to be less than or equal to 1\.0\.0/)
    })
  })

  describe('.eq', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().eq('1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().eq('1.0.0')) }).to.throw(/"value" needs to be logically equivalent to 1\.0\.0/)
    })
  })

  describe('.neq', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().neq('1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().neq('1.2.3')) }).to.throw(/"value" needs to be logically different than 1\.2\.3/)
    })
  })

  describe('.cmp', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().cmp('=', '1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().cmp('=', '1.0.0')) }).to.throw(/"value" needs to satisfy = on 1\.0\.0/)
    })
    it('should reject invalid params', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().cmp('=', 'x.y.z')) }).to.throw(/exp needs to be a valid semver expression or reference/)
      expect(function () { Joi.attempt('1.2.3', Joi.semver().cmp('foo', '1.0.0')) }).to.throw(/cmp needs to be a valid comparator or reference/)
    })
  })

  describe('.satisfies', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().satisfies('^1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().satisfies('~1.0.0')) }).to.throw(/"value" needs to satisfy ~1\.0\.0/)
    })
  })

  describe('.gtr', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().gtr('~1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().gtr('^1.0.0')) }).to.throw(/"value" needs to be greater than range \^1\.0\.0/)
    })
  })

  describe('.ltr', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().ltr('~2.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().ltr('^1.2.3')) }).to.throw(/"value" needs to be less than range \^1\.2\.3/)
    })
  })

  describe('outside', function () {
    it('should accept version', function () {
      expect(Joi.attempt('1.2.3', Joi.semver().outside('<', '~2.0.0'))).to.eql('1.2.3')
      expect(Joi.attempt('1.2.3', Joi.semver().outside('>', '~1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().outside('<', '~1.0.0')) }).to.throw(/"value" needs to be < than range ~1\.0\.0/)
      expect(function () { Joi.attempt('1.2.3', Joi.semver().outside('>', '~2.0.0')) }).to.throw(/"value" needs to be > than range ~2\.0\.0/)
    })
    it('should reject invalid params', function () {
      expect(function () { Joi.attempt('1.2.3', Joi.semver().outside('>', 'x.y.z')) }).to.throw(/rng needs to be a valid semver range or reference/)
      expect(function () { Joi.attempt('1.2.3', Joi.semver().outside('foo', '~1.0.0')) }).to.throw(/hilo needs to be a valid comparator or reference/)
    })
  })
})

describe('semverRange', function () {
  describe('.valid', function () {
    it('should accept valid range', function () {
      expect(Joi.attempt('1.2.3 - 1.8.0', Joi.semverRange().valid())).to.eql('1.2.3 - 1.8.0')
    })
    it('should reject invalid range', function () {
      expect(function () { Joi.attempt('a.b.c', Joi.semverRange().valid()) }).to.throw(/"value" needs to be a valid semver range/)
    })
  })
})
