import { UserDataBuilder } from '../../../testing/helpers/user-data-builder'
import { UserEntity, UserProps } from '../../user.entity'

describe('UserEntity unit tests', () => {
  let props: UserProps
  let sut: UserEntity
  beforeEach(() => {
    props = UserDataBuilder({})

    sut = new UserEntity(props)
  })
  it('should create a new user', () => {
    expect(sut.props.name).toBe(props.name)
    expect(sut.props.email).toBe(props.email)
    expect(sut.props.password).toBe(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  it('Getter of name field', () => {
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toEqual(props.name)
    expect(typeof sut.props.name).toBe('string')
  })
  it('Setter of name field', () => {
    const newName = 'John Doe'
    sut['name'] = newName
    expect(sut.props.name).toBeDefined()
    expect(sut.props.name).toBe(newName)
    expect(typeof sut.props.name).toBe('string')
  })
  it('Getter of email field', () => {
    expect(sut.props.email).toBeDefined()
    expect(sut.props.email).toEqual(props.email)
    expect(typeof sut.props.email).toBe('string')
  })
  it('Getter of password field', () => {
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toEqual(props.password)
    expect(typeof sut.props.password).toBe('string')
  })
  it('Setter of password field', () => {
    const newPassw = 'qwerty@123'
    sut['password'] = newPassw
    expect(sut.props.password).toBeDefined()
    expect(sut.props.password).toBe(newPassw)
    expect(typeof sut.props.password).toBe('string')
  })
  it('Getter of createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined()
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })
  it('should update the update method', () => {
    const value = 'John Doe'
    sut.update(value)
    expect(sut.props.name).toBe(value)
  })
  it('should update the updatePassword method', () => {
    const value = '123'
    sut.updatePassowrd(value)
    expect(sut.props.password).toBe(value)
  })
})
