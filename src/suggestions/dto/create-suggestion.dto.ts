import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
    IsNumber

} from 'class-validator';
export class CreateSuggestionDto {

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    description?: string;


    @IsEmail()
    email: string;
}
