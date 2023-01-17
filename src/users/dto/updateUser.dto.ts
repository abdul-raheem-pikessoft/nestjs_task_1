import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
