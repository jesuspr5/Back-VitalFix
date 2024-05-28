import { PartialType } from '@nestjs/swagger';
import { CreateRequestDto } from './create-request.dto';
import { IsOptional, IsString, MinLength, IsNumber, IsUUID, IsEmail } from 'class-validator';

export class UpdateRequestDto {



    @IsUUID()
    equipId: string;

    @IsString()
    @MinLength(1)
    details?: string;


    @IsString()
    @MinLength(1)
    maker?: string;



    @IsString()
    @MinLength(1)
    model?: string;


    @IsString()
    @MinLength(1)
    serial?: string;


    @IsString()
    @MinLength(1)
    description?: string;

    @IsOptional()
    @IsString()
    urlAvatar?: string;


    @IsString()
    @MinLength(1)
    name?: string;


    @IsString()
    @MinLength(1)
    lastname?: string;

    @IsEmail()
    email: string;


    @IsString()
    @MinLength(1)
    phone?: string;


    @IsString()
    @MinLength(1)
    address?: string;


    @IsString()
    @MinLength(1)
    reference?: string;


    @IsString()
    @MinLength(1)
    type?: string;


    @IsString()
    @MinLength(1)
    status?: string;
}


export class SetTecnico {


    @IsUUID()
    tecnicoId: string;


}