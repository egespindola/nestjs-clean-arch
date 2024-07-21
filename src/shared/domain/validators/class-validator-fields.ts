import { validateSync } from 'class-validator'
import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface'

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors = null
  validatedData: PropsValidated = null

  validate(data: any): boolean {
    const errors = validateSync(data)

    if (errors.length) {
      this.errors = {}
      for (const err of errors) {
        // this.errors[err.property] = [err.constraints[err.constraint]]
        const field = err.property
        this.errors[field] = Object.values(err.constraints)
      }
      return false
    } else {
      this.validatedData = data
    }

    return !errors.length
    // throw new Error('Method not implemented.')
  }
}
