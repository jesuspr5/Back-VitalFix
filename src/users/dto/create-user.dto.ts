import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Role } from '../../common/enums/rol.enum';
export class CreateUserDto {

  @IsOptional()
  @IsString()
  role: Role


  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name?: string;


  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  lastname?: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()

  urlAvatar?: string;


}

export class UserDto {
  readonly id: string;
  readonly role: Role
  readonly name: string;
  readonly lastname: string;
  readonly email: string;

}
