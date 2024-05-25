import {
    IsDateString,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateClaimDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsDateString()
    fecha: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    description: string;

    @IsString()
    request_id: string;

    @IsString()
    @MinLength(1)
    status: string;
}
