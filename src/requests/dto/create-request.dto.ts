import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    IsUUID,
    IsUrl,
    MinLength,
    IsEmpty,
} from 'class-validator';
export class CreateRequestDto {
    @Transform(({ value }) => value.trim())
    @IsUUID()
    equipId: string;


    user: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    details: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    maker: string;


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    model: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    serial: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    description: string;

    @IsOptional()
    urlAvatar?: string | null;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    lastname: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    phone: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    address: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    reference: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    type: string;


    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    status?: string;


}

