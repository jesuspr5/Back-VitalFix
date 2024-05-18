import {
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreatePromotionDto {
    @IsString()
    @MinLength(1)
    titulo: string;

    @IsString()
    @MinLength(1)
    type: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    status: string;
}
