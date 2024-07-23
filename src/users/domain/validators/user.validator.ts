import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { UserProps } from '../entities/user.entity'
import { ClassValidatorFields } from '../../../shared/domain/validators/class-validator-fields'

export class UserRules {
  @MaxLength(255, { message: 'name must be shorter than or equal to 255' })
  @IsString({ message: 'name must be a valid string' })
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string

  @MaxLength(255, { message: 'email must be shorter than or equal to 255' })
  @IsString({ message: 'email must be a valid string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @IsNotEmpty({ message: 'email must not be empty' })
  email: string

  @MaxLength(100, { message: 'password must be shorter than or equal to 100' })
  @IsString({ message: 'password must be a valid string' })
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string

  @IsDate({ message: 'createdAt must be a valid date' })
  @IsOptional()
  createdAt?: Date

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
