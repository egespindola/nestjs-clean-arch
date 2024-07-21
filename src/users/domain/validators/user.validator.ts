import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields'

class UserRules {
  @MaxLength(255, { message: 'name must be shorter than or equal to 255' })
  @IsString({ message: 'name must be a valid string' })
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string

  email: string

  password: string

  createdAt: Date

  constructor({ name, email, password, createdAt }: UserProps) {
    Object.assign(this, { name, email, password, createdAt })
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProps): boolean {
    return super.validate(new UserRules(data ?? ({} as UserRules)))
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator()
  }
}
