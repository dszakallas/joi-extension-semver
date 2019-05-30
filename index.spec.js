var joi = require('@hapi/joi').extend(require('./'))
var expect = require('chai').expect

describe('semver', function () {
  describe('.valid', function () {
    it('should accept valid version', function () {
      expect(joi.attempt('1.2.3', joi.semver().valid())).to.eql('1.2.3')
      expect(joi.attempt('v1.2.3', joi.semver().valid())).to.eql('v1.2.3')
    })
    it('should reject invalid version', function () {
      expect(function () { joi.attempt('a.b.c', joi.semver().valid()) }).to.throw(/"value" needs to be a valid semver expression/)
      expect(function () { joi.attempt('58678', joi.semver().valid()) }).to.throw(/"value" needs to be a valid semver expression/)
    })
  })

  describe('.gt', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().gt('0.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().gt('2.0.0')) }).to.throw(/"value" needs to be greater than 2\.0\.0/)
    })
  })

  describe('.gte', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().gte('1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().gte('2.0.0')) }).to.throw(/"value" needs to be greater than or equal to 2\.0\.0/)
    })
  })

  describe('.lt', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().lt('2.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().lt('1.2.3')) }).to.throw(/"value" needs to be less than 1\.2\.3/)
    })
  })

  describe('.lte', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().lte('1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().lte('1.0.0')) }).to.throw(/"value" needs to be less than or equal to 1\.0\.0/)
    })
  })

  describe('.eq', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().eq('1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().eq('1.0.0')) }).to.throw(/"value" needs to be logically equivalent to 1\.0\.0/)
    })
  })

  describe('.neq', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().neq('1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().neq('1.2.3')) }).to.throw(/"value" needs to be logically different than 1\.2\.3/)
    })
  })

  describe('.cmp', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().cmp('=', '1.2.3'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().cmp('=', '1.0.0')) }).to.throw(/"value" needs to satisfy = on 1\.0\.0/)
    })
  })

  describe('.validRange', function () {
    it('should accept valid range', function () {
      expect(joi.attempt('1.2.3 - 1.8.0', joi.semver().validRange())).to.eql('1.2.3 - 1.8.0')
    })
    it('should reject invalid range', function () {
      expect(function () { joi.attempt('a.b.c', joi.semver().validRange()) }).to.throw(/"value" needs to be a valid range/)
    })
  })

  describe('.satisfies', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().satisfies('^1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().satisfies('~1.0.0')) }).to.throw(/"value" needs to satisfy ~1\.0\.0/)
    })
  })

  describe('.gtr', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().gtr('~1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().gtr('^1.0.0')) }).to.throw(/"value" needs to be greater than range \^1\.0\.0/)
    })
  })

  describe('.ltr', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().ltr('~2.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().ltr('^1.2.3')) }).to.throw(/"value" needs to be less than range \^1\.2\.3/)
    })
  })

  describe('outside', function () {
    it('should accept version', function () {
      expect(joi.attempt('1.2.3', joi.semver().outside('<', '~2.0.0'))).to.eql('1.2.3')
      expect(joi.attempt('1.2.3', joi.semver().outside('>', '~1.0.0'))).to.eql('1.2.3')
    })
    it('should reject version', function () {
      expect(function () { joi.attempt('1.2.3', joi.semver().outside('<', '~1.0.0')) }).to.throw(/"value" needs to be < than range ~1\.0\.0/)
      expect(function () { joi.attempt('1.2.3', joi.semver().outside('>', '~2.0.0')) }).to.throw(/"value" needs to be > than range ~2\.0\.0/)
    })
  })
})
