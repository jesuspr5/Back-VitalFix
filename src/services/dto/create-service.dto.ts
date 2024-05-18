import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
} from 'class-validator';
export class CreateServiceDto {


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name?: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    type?: string;


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    price?: number;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    description?: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    status?: string;


}
