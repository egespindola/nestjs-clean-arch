import { ClassValidatorFields } from '../../class-validator-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string
}> {}

describe('Class Validator Fields Unit Tests', () => {
  it('should initialize errors and validatedData with null', () => {
    const sut = new StubClassValidatorFields()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })
  it('should validate errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    const constraintErr = { isRequired: 'Test error' }

    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: constraintErr },
    ])

    const sut = new StubClassValidatorFields()
    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['Test error'] })
  })
  it('should validate without errors', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')

    spyValidateSync.mockReturnValue([])
    const objData = { field: 'value' }

    const sut = new StubClassValidatorFields()
    expect(sut.validate(objData)).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual(objData)
    expect(sut.errors).toBeNull()
  })
})
