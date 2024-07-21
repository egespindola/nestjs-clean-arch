import { Entity } from '../../entity'
import { validate as uuidValidate } from 'uuid'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {
  constructor(props: StubProps, id?: string) {
    super(props, id)
  }
}

describe('Entity unit tests', () => {
  let props: StubProps
  let sut: StubEntity

  beforeEach(() => {
    props = {
      prop1: 'prop1',
      prop2: 1,
    }
    sut = new StubEntity(props)
  })
  it('should set properties and id', () => {
    expect(sut.props).toStrictEqual(props)
    expect(sut.id).toBeDefined()
    expect(sut.id).not.toBeNull()
    expect(sut.id).not.toBeUndefined()
    expect(uuidValidate(sut.id)).toBeTruthy()
  })

  it('should accept id', () => {
    // const id = '123' //falsy
    const id = '1a307dd9-1d8e-41c2-946c-531fdc335c9f' //truthy
    sut = new StubEntity(props, id)

    expect(uuidValidate(sut.id)).toBeTruthy()
  })

  it('should convert an entity into a JSON', () => {
    const id = '1a307dd9-1d8e-41c2-946c-531fdc335c9f'
    sut = new StubEntity(props, id)

    expect(sut.toJSON()).toStrictEqual({ id, ...props })
  })
})
