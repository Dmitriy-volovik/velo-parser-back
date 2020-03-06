import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(4, 60)
  readonly email: string;

  @IsNotEmpty()
  @Length(4, 100)
  readonly password: string;
}
