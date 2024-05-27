import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../common/enums/rol.enum';
export class RegisterDto {

  @IsOptional()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(Role)
  role: Role;


  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
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

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  reference: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  address: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  phone: string;
}
