import Joi from '@hapi/joi'
import { semver, semverRange } from 'joi-extension-semver'

Joi.extend(semver)
Joi.extend(semverRange)

Joi.semver().valid()
Joi.semver().gt('1.2.3')
Joi.semver().gte('1.2.3')
Joi.semver().lt('1.2.3')
Joi.semver().lte('1.2.3')
Joi.semver().eq('1.2.3')
Joi.semver().neq('1.2.3')
Joi.semver().cmp('gt', '1.2.3')
Joi.semver().satisfies('>1.2.3')
Joi.semver().gtr('>1.2.3')
Joi.semver().ltr('>1.2.3')
Joi.semver().outside('>', '>1.2.3')

Joi.semverRange().valid()
