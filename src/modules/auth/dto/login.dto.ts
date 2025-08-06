import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
