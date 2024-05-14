import {
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateInventoryDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    quantity: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    @MinLength(1)
    status: string;
}
