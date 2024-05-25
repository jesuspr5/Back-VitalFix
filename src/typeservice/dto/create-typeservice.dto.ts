import { Transform } from 'class-transformer';
import {
    IsNumber,
    IsPositive,
    IsString,
    MinLength,
} from 'class-validator';


export class CreateTypeserviceDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    warrantyDays: number;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    status?: string;

}
