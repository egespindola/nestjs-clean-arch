import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from './../../user.validator'
import { UserDataBuilder } from '../../../testing/helpers/user-data-builder'
import { UserProps } from '../../../entities/user.entity'

const _NAMEMSGERR = {
  isNotEmpty: 'name must not be empty',
  isString: 'name must be a valid string',
  maxLength: 'name must be shorter than or equal to 255',
}
const _EMAILMSGERR = {
  isNotEmpty: 'email must not be empty',
  isString: 'email must be a valid string',
  maxLength: 'email must be shorter than or equal to 255',
  isEmail: 'email must be a valid email',
}
const _PASSWORDMSGERR = {
  isNotEmpty: 'password must not be empty',
  isString: 'password must be a valid string',
  maxLength: 'password must be shorter than or equal to 100',
}
const _CREATEDAT = {
  isDate: 'createdAt must be a valid date',
}

let sut: UserValidator
let props: UserProps

describe('UserValidator Unit Tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create()
    props = UserDataBuilder({})
  })
  it('Validation case User Validator', () => {
    const isValid = sut.validate(props)

    expect(isValid).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toStrictEqual(new UserRules(props))
  })

  describe('Name field', () => {
    it('Invalidation cases', () => {
      // check all validators
      let isValid = sut.validate(null as any)

      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        _NAMEMSGERR.isNotEmpty,
        _NAMEMSGERR.isString,
        _NAMEMSGERR.maxLength,
      ])

      // check not empty
      isValid = sut.validate({ name: '' } as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([_NAMEMSGERR.isNotEmpty])

      // check not string
      isValid = sut.validate({ name: 123 } as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([
        _NAMEMSGERR.isString,
        _NAMEMSGERR.maxLength,
      ])

      // check max len
      isValid = sut.validate({ name: ''.padStart(256, 'X') } as any)
      expect(isValid).toBeFalsy()
      expect(sut.errors['name']).toStrictEqual([_NAMEMSGERR.maxLength])
    })
  })

  it('Invalidation cases of field email', () => {
    // check all validators
    let isValid = sut.validate(null as any)

    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      _EMAILMSGERR.isNotEmpty,
      _EMAILMSGERR.isEmail,
      _EMAILMSGERR.isString,
      _EMAILMSGERR.maxLength,
    ])

    // check not empty
    isValid = sut.validate({ email: '' } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      _EMAILMSGERR.isNotEmpty,
      _EMAILMSGERR.isEmail,
    ])

    // check not email
    isValid = sut.validate({ email: 'john.doe' } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([_EMAILMSGERR.isEmail])

    // check not string
    isValid = sut.validate({ email: 123 } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      _EMAILMSGERR.isEmail,
      _EMAILMSGERR.isString,
      _EMAILMSGERR.maxLength,
    ])

    // check max len
    isValid = sut.validate({ email: 'XXX'.repeat(252) + '@email.com' } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['email']).toStrictEqual([
      _EMAILMSGERR.isEmail,
      _EMAILMSGERR.maxLength,
    ])
  })

  it('Invalidation cases of field password', () => {
    // check all validators
    let isValid = sut.validate(null as any)

    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      _PASSWORDMSGERR.isNotEmpty,
      _PASSWORDMSGERR.isString,
      _PASSWORDMSGERR.maxLength,
    ])

    // check not empty
    isValid = sut.validate({ password: '' } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([_PASSWORDMSGERR.isNotEmpty])

    // check not string
    isValid = sut.validate({ passowrd: 123 } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([
      _PASSWORDMSGERR.isNotEmpty,
      _PASSWORDMSGERR.isString,
      _PASSWORDMSGERR.maxLength,
    ])

    // check max len
    isValid = sut.validate({ password: 'XXX'.repeat(99) } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['password']).toStrictEqual([_PASSWORDMSGERR.maxLength])
  })

  it('Invalidation cases of field createdAt', () => {
    // check all validators
    let isValid = sut.validate(props)

    // check empty
    isValid = sut.validate({ ...props, createdAt: null })
    expect(isValid).toBeTruthy()

    // check not date
    isValid = sut.validate({ ...props, createdAt: 'xpto' } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['createdAt']).toStrictEqual([_CREATEDAT.isDate])

    // check not date
    isValid = sut.validate({ ...props, createdAt: 123 } as any)
    expect(isValid).toBeFalsy()
    expect(sut.errors['createdAt']).toStrictEqual([_CREATEDAT.isDate])
  })
})
