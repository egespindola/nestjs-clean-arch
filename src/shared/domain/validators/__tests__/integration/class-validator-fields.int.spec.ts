import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

const classValidatorErrorMessage = {
  name: {
    maxLength: 'name should be shorter than or equal to 255',
    isString: 'name must be a valid string',
    isNotEmpty: 'name must not be empty',
  },
  price: {
    isNumber: 'price must be a valid number',
    isNotEmpty: 'price must not be empty',
  },
}

class StubRules {
  @MaxLength(255, { message: classValidatorErrorMessage.name['maxLength'] })
  @IsString({ message: classValidatorErrorMessage.name['isString'] })
  @IsNotEmpty({ message: classValidatorErrorMessage.name['isNotEmpty'] })
  name: string

  @IsNumber(
    { allowNaN: false },
    { message: classValidatorErrorMessage.price['isNumber'] },
  )
  @IsNotEmpty({ message: classValidatorErrorMessage.price['isNotEmpty'] })
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<{
  StubRules
}> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('Should validate with errors', () => {
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      name: [
        classValidatorErrorMessage.name.isNotEmpty,
        classValidatorErrorMessage.name.isString,
        classValidatorErrorMessage.name.maxLength,
      ],
      price: [
        classValidatorErrorMessage.price.isNotEmpty,
        classValidatorErrorMessage.price.isNumber,
      ],
    })
  })

  it('Should validate without errors', () => {
    const sut = new StubClassValidatorFields()
    const stubRulesClass = new StubRules({ name: 'value', price: 10 })

    console.log('>>>>> class:', stubRulesClass)

    expect(sut.validate({ name: 'value', price: 10 })).toBeTruthy()
    expect(sut.validatedData).toStrictEqual(stubRulesClass)
  })
})
