import {
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreatePromotionDto {
    @IsString()
    @MinLength(1)
    titulo: string;


    @IsOptional()
    @IsString()
    @MinLength(1)
    description: string;



}
