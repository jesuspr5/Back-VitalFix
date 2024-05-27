import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  lastname: string;

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
