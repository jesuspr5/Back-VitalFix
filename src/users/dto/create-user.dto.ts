import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

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
  @IsUrl()
  urlAvatar?: string;
}
