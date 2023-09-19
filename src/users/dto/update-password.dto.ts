import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  newPassword: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
