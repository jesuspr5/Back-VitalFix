import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
    IsNumber

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


    @IsNumber()
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
